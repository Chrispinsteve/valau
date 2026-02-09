"use client"

import { useState } from "react"
import { Clock, DollarSign } from "lucide-react"
import { services, categories, type Service } from "@/lib/spa-data"
import { cn } from "@/lib/utils"

interface StepServiceProps {
  selected: Service | null
  onSelect: (service: Service) => void
}

export function StepService({ selected, onSelect }: StepServiceProps) {
  const [activeCategory, setActiveCategory] = useState("all")

  const filtered =
    activeCategory === "all"
      ? services
      : services.filter((s) => s.category === activeCategory)

  return (
    <div>
      <h2 className="font-serif text-2xl text-foreground mb-2">Select a Service</h2>
      <p className="text-sm text-muted-foreground mb-8">
        Choose the treatment you would like to book.
      </p>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "px-4 py-1.5 text-[11px] tracking-widest uppercase transition-colors",
              activeCategory === cat.id
                ? "bg-primary text-primary-foreground"
                : "border border-border text-muted-foreground hover:text-foreground"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Service List */}
      <div className="flex flex-col gap-3">
        {filtered.map((service) => (
          <button
            key={service.id}
            type="button"
            onClick={() => onSelect(service)}
            className={cn(
              "flex items-center justify-between p-5 border text-left transition-colors",
              selected?.id === service.id
                ? "border-primary bg-primary/5"
                : "border-border hover:border-foreground/30"
            )}
          >
            <div>
              <h3 className="font-serif text-base text-foreground">{service.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{service.description}</p>
            </div>
            <div className="flex flex-col items-end gap-1 ml-4 shrink-0">
              <span className="flex items-center gap-1 text-sm text-foreground">
                <DollarSign className="h-3.5 w-3.5" />
                {service.price}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {service.duration} min
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
