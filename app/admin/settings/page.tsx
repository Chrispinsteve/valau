"use client"

import { useState } from "react"
import { businessHours } from "@/lib/spa-data"
import { CheckCircle } from "lucide-react"

const dayOrder = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

type HoursState = Record<string, { open: string; close: string; closed: boolean }>

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false)
  const [hours, setHours] = useState<HoursState>(() => {
    const state: HoursState = {}
    for (const day of dayOrder) {
      const h = businessHours[day]
      state[day] = h
        ? { open: h.open, close: h.close, closed: false }
        : { open: "09:00", close: "17:00", closed: true }
    }
    return state
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl md:text-3xl text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your business hours and preferences.
        </p>
      </div>

      {/* Business Hours */}
      <div className="bg-card border border-border p-6 mb-6">
        <h2 className="font-serif text-lg text-foreground mb-6">Business Hours</h2>
        <div className="flex flex-col gap-4">
          {dayOrder.map((day) => (
            <div
              key={day}
              className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 py-2 border-b border-border last:border-0"
            >
              <span className="text-sm text-foreground capitalize w-24 shrink-0">
                {day}
              </span>
              <label className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
                <input
                  type="checkbox"
                  checked={hours[day].closed}
                  onChange={(e) =>
                    setHours({
                      ...hours,
                      [day]: { ...hours[day], closed: e.target.checked },
                    })
                  }
                  className="accent-primary"
                />
                Closed
              </label>
              {!hours[day].closed && (
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={hours[day].open}
                    onChange={(e) =>
                      setHours({
                        ...hours,
                        [day]: { ...hours[day], open: e.target.value },
                      })
                    }
                    className="bg-background border border-border px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                  <span className="text-muted-foreground text-sm">to</span>
                  <input
                    type="time"
                    value={hours[day].close}
                    onChange={(e) =>
                      setHours({
                        ...hours,
                        [day]: { ...hours[day], close: e.target.value },
                      })
                    }
                    className="bg-background border border-border px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Blocked Slots Note */}
      <div className="bg-card border border-border p-6 mb-6">
        <h2 className="font-serif text-lg text-foreground mb-4">Blocked Time Slots</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          To block specific time slots (e.g., for breaks or private appointments), 
          connect a database integration. This will allow you to persist blocked 
          slots and have them reflected in the public booking calendar in real time.
        </p>
      </div>

      {/* Save */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={handleSave}
          className="bg-primary text-primary-foreground px-6 py-2.5 text-xs tracking-widest uppercase transition-opacity hover:opacity-90"
        >
          Save Changes
        </button>
        {saved && (
          <span className="flex items-center gap-1.5 text-sm text-foreground">
            <CheckCircle className="h-4 w-4" />
            Saved
          </span>
        )}
      </div>
    </div>
  )
}
