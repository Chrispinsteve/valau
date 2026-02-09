"use client"

import { useSyncExternalStore } from "react"
import { getAppointments, updateAppointmentStatus, subscribeAdmin } from "@/lib/admin-store"
import type { Appointment } from "@/lib/spa-data"
import { cn } from "@/lib/utils"

const statusColors: Record<Appointment["status"], string> = {
  confirmed: "bg-accent text-accent-foreground",
  completed: "bg-primary text-primary-foreground",
  cancelled: "bg-muted text-muted-foreground",
}

export default function AppointmentsPage() {
  const appointments = useSyncExternalStore(subscribeAdmin, getAppointments, getAppointments)

  const sorted = [...appointments].sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateA - dateB
  })

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl md:text-3xl text-foreground">Appointments</h1>
        <p className="text-sm text-muted-foreground mt-1">
          View and manage all bookings.
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-card border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-4 py-3 text-xs tracking-widest uppercase text-muted-foreground font-normal">
                Client
              </th>
              <th className="text-left px-4 py-3 text-xs tracking-widest uppercase text-muted-foreground font-normal">
                Service
              </th>
              <th className="text-left px-4 py-3 text-xs tracking-widest uppercase text-muted-foreground font-normal">
                Date
              </th>
              <th className="text-left px-4 py-3 text-xs tracking-widest uppercase text-muted-foreground font-normal">
                Time
              </th>
              <th className="text-left px-4 py-3 text-xs tracking-widest uppercase text-muted-foreground font-normal">
                Status
              </th>
              <th className="text-left px-4 py-3 text-xs tracking-widest uppercase text-muted-foreground font-normal">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((appt) => (
              <tr key={appt.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3">
                  <p className="text-foreground">{appt.clientName}</p>
                  <p className="text-xs text-muted-foreground">{appt.clientEmail}</p>
                </td>
                <td className="px-4 py-3 text-foreground">{appt.service.name}</td>
                <td className="px-4 py-3 text-foreground">
                  {new Date(appt.date + "T12:00:00").toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="px-4 py-3 text-foreground">{appt.time}</td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "inline-block px-3 py-1 text-[10px] tracking-widest uppercase",
                      statusColors[appt.status]
                    )}
                  >
                    {appt.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    {appt.status === "confirmed" && (
                      <>
                        <button
                          type="button"
                          onClick={() => updateAppointmentStatus(appt.id, "completed")}
                          className="text-[10px] tracking-widest uppercase text-foreground underline underline-offset-4 hover:no-underline"
                        >
                          Complete
                        </button>
                        <button
                          type="button"
                          onClick={() => updateAppointmentStatus(appt.id, "cancelled")}
                          className="text-[10px] tracking-widest uppercase text-destructive underline underline-offset-4 hover:no-underline"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-3">
        {sorted.map((appt) => (
          <div key={appt.id} className="bg-card border border-border p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm font-medium text-foreground">{appt.clientName}</p>
                <p className="text-xs text-muted-foreground">{appt.service.name}</p>
              </div>
              <span
                className={cn(
                  "px-2.5 py-1 text-[10px] tracking-widest uppercase",
                  statusColors[appt.status]
                )}
              >
                {appt.status}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
              <span>
                {new Date(appt.date + "T12:00:00").toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <span>{appt.time}</span>
              <span>${appt.service.price}</span>
            </div>
            {appt.status === "confirmed" && (
              <div className="flex gap-3 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => updateAppointmentStatus(appt.id, "completed")}
                  className="text-[10px] tracking-widest uppercase text-foreground underline underline-offset-4"
                >
                  Complete
                </button>
                <button
                  type="button"
                  onClick={() => updateAppointmentStatus(appt.id, "cancelled")}
                  className="text-[10px] tracking-widest uppercase text-destructive underline underline-offset-4"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
