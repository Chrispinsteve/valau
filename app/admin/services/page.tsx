"use client"

import React from "react"

import { useState, useSyncExternalStore } from "react"
import { Plus, Pencil, Trash2, X } from "lucide-react"
import {
  getServices,
  addService,
  updateService,
  deleteService,
  subscribeAdmin,
} from "@/lib/admin-store"
import type { Service } from "@/lib/spa-data"
import { cn } from "@/lib/utils"

type ServiceForm = {
  name: string
  category: Service["category"]
  description: string
  duration: string
  price: string
}

const emptyForm: ServiceForm = {
  name: "",
  category: "facial",
  description: "",
  duration: "",
  price: "",
}

export default function AdminServicesPage() {
  const services = useSyncExternalStore(subscribeAdmin, getServices, getServices)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<ServiceForm>(emptyForm)

  const handleAdd = () => {
    setEditingId(null)
    setForm(emptyForm)
    setShowForm(true)
  }

  const handleEdit = (service: Service) => {
    setEditingId(service.id)
    setForm({
      name: service.name,
      category: service.category,
      description: service.description,
      duration: String(service.duration),
      price: String(service.price),
    })
    setShowForm(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const data = {
      name: form.name,
      category: form.category,
      description: form.description,
      duration: Number(form.duration),
      price: Number(form.price),
      image: "/images/services-facial.jpg",
    }

    if (editingId) {
      updateService(editingId, data)
    } else {
      addService(data)
    }

    setShowForm(false)
    setForm(emptyForm)
    setEditingId(null)
  }

  const handleDelete = (id: string) => {
    deleteService(id)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl text-foreground">Services</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your service menu.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 text-xs tracking-widest uppercase transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Add
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-card border border-border p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-lg text-foreground">
              {editingId ? "Edit Service" : "New Service"}
            </h2>
            <button
              type="button"
              onClick={() => {
                setShowForm(false)
                setEditingId(null)
              }}
              aria-label="Close form"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label htmlFor="svc-name" className="text-xs tracking-widest uppercase text-muted-foreground">
                Name
              </label>
              <input
                id="svc-name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-background border border-border px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="svc-category" className="text-xs tracking-widest uppercase text-muted-foreground">
                Category
              </label>
              <select
                id="svc-category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as Service["category"] })}
                className="bg-background border border-border px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="facial">Facial</option>
                <option value="massage">Massage</option>
                <option value="body">Body</option>
                <option value="lash">Lash</option>
                <option value="waxing">Waxing</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="svc-duration" className="text-xs tracking-widest uppercase text-muted-foreground">
                Duration (min)
              </label>
              <input
                id="svc-duration"
                type="number"
                required
                min="15"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                className="bg-background border border-border px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="svc-price" className="text-xs tracking-widest uppercase text-muted-foreground">
                Price ($)
              </label>
              <input
                id="svc-price"
                type="number"
                required
                min="1"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="bg-background border border-border px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label htmlFor="svc-desc" className="text-xs tracking-widest uppercase text-muted-foreground">
                Description
              </label>
              <textarea
                id="svc-desc"
                rows={3}
                required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="bg-background border border-border px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-6 py-2.5 text-xs tracking-widest uppercase transition-opacity hover:opacity-90"
              >
                {editingId ? "Update" : "Add Service"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Services List */}
      <div className="flex flex-col gap-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-card border border-border p-4 flex items-center justify-between"
          >
            <div className="flex-1 min-w-0 mr-4">
              <p className="text-sm font-medium text-foreground truncate">{service.name}</p>
              <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                <span className="capitalize">{service.category}</span>
                <span>{service.duration} min</span>
                <span>${service.price}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleEdit(service)}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={`Edit ${service.name}`}
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(service.id)}
                className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                aria-label={`Delete ${service.name}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
