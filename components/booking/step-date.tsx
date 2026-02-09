"use client"

import { Calendar } from "@/components/ui/calendar"
import { businessHours } from "@/lib/spa-data"
import { ArrowLeft } from "lucide-react"

interface StepDateProps {
  selected: Date | null
  onSelect: (date: Date) => void
  onBack: () => void
}

export function StepDate({ selected, onSelect, onBack }: StepDateProps) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const disabledDays = (date: Date) => {
    if (date < today) return true
    const dayName = date
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase()
    return businessHours[dayName] === null
  }

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <h2 className="font-serif text-2xl text-foreground mb-2">Choose a Date</h2>
      <p className="text-sm text-muted-foreground mb-8">
        Select your preferred appointment date. Sundays are closed.
      </p>

      <div className="flex justify-center">
        <Calendar
          mode="single"
          selected={selected ?? undefined}
          onSelect={(date) => date && onSelect(date)}
          disabled={disabledDays}
          className="rounded-none border border-border p-4"
        />
      </div>
    </div>
  )
}
