"use client"

import { useMemo } from "react"
import { ArrowLeft } from "lucide-react"
import { generateTimeSlots } from "@/lib/spa-data"
import { cn } from "@/lib/utils"

interface StepTimeProps {
  date: Date
  serviceDuration: number
  selected: string | null
  onSelect: (time: string) => void
  onBack: () => void
}

export function StepTime({ date, serviceDuration, selected, onSelect, onBack }: StepTimeProps) {
  const slots = useMemo(() => generateTimeSlots(date, serviceDuration), [date, serviceDuration])

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })

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

      <h2 className="font-serif text-2xl text-foreground mb-2">Select a Time</h2>
      <p className="text-sm text-muted-foreground mb-8">
        Available slots for {formattedDate}
      </p>

      {slots.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-sm text-muted-foreground">
            No available time slots for this date. Please select a different date.
          </p>
          <button
            type="button"
            onClick={onBack}
            className="mt-4 text-xs tracking-widest uppercase text-foreground underline underline-offset-4"
          >
            Choose Another Date
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {slots.map((slot) => (
            <button
              key={slot.time}
              type="button"
              onClick={() => slot.available && onSelect(slot.time)}
              disabled={!slot.available}
              className={cn(
                "py-3 px-2 text-sm text-center transition-colors",
                !slot.available && "opacity-30 cursor-not-allowed line-through",
                slot.available && selected === slot.time
                  ? "bg-primary text-primary-foreground"
                  : slot.available
                    ? "border border-border text-foreground hover:border-foreground/30"
                    : "border border-border/50 text-muted-foreground"
              )}
            >
              {slot.time}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
