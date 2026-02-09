"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import { CalendarDays, DollarSign, Clock, Users } from "lucide-react"
import { getAppointments, getServices, subscribeAdmin } from "@/lib/admin-store"

function useAdminStore<T>(getter: () => T) {
  return useSyncExternalStore(subscribeAdmin, getter, getter)
}

export default function AdminOverviewPage() {
  const appointments = useAdminStore(getAppointments)
  const services = useAdminStore(getServices)

  const today = new Date().toISOString().split("T")[0]
  const todaysAppointments = appointments.filter((a) => a.date === today)
  const confirmedToday = todaysAppointments.filter((a) => a.status === "confirmed")
  const totalRevenue = appointments
    .filter((a) => a.status !== "cancelled")
    .reduce((sum, a) => sum + a.service.price, 0)

  const stats = [
    {
      label: "Today's Appointments",
      value: confirmedToday.length,
      icon: CalendarDays,
    },
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
    },
    {
      label: "Active Services",
      value: services.length,
      icon: Clock,
    },
    {
      label: "Total Bookings",
      value: appointments.length,
      icon: Users,
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl md:text-3xl text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome back. Here is your daily overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs tracking-widest uppercase text-muted-foreground">
                {stat.label}
              </p>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="font-serif text-2xl text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Today's Schedule */}
      <div className="bg-card border border-border p-6">
        <h2 className="font-serif text-lg text-foreground mb-4">Today&apos;s Schedule</h2>
        {confirmedToday.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8 text-center">
            No appointments scheduled for today.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {confirmedToday.map((appt) => (
              <div
                key={appt.id}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{appt.clientName}</p>
                  <p className="text-xs text-muted-foreground">{appt.service.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-foreground">{appt.time}</p>
                  <p className="text-xs text-muted-foreground">
                    {appt.service.duration} min
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
