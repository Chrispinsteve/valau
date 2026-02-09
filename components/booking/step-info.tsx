"use client"

import { ArrowLeft } from "lucide-react"
import type { BookingData } from "@/lib/spa-data"

interface StepInfoProps {
  booking: BookingData
  onUpdate: (data: Partial<BookingData>) => void
  onNext: () => void
  onBack: () => void
}

export function StepInfo({ booking, onUpdate, onNext, onBack }: StepInfoProps) {
  const isValid =
    booking.clientName.trim().length > 0 &&
    booking.clientEmail.trim().length > 0 &&
    booking.clientPhone.trim().length > 0

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

      <h2 className="font-serif text-2xl text-foreground mb-2">Your Information</h2>
      <p className="text-sm text-muted-foreground mb-8">
        Please provide your contact details so we can confirm your appointment.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (isValid) onNext()
        }}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="booking-name" className="text-xs tracking-widest uppercase text-muted-foreground">
            Full Name *
          </label>
          <input
            id="booking-name"
            type="text"
            required
            value={booking.clientName}
            onChange={(e) => onUpdate({ clientName: e.target.value })}
            className="bg-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring"
            placeholder="Your full name"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="booking-email" className="text-xs tracking-widest uppercase text-muted-foreground">
            Email *
          </label>
          <input
            id="booking-email"
            type="email"
            required
            value={booking.clientEmail}
            onChange={(e) => onUpdate({ clientEmail: e.target.value })}
            className="bg-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring"
            placeholder="you@email.com"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="booking-phone" className="text-xs tracking-widest uppercase text-muted-foreground">
            Phone *
          </label>
          <input
            id="booking-phone"
            type="tel"
            required
            value={booking.clientPhone}
            onChange={(e) => onUpdate({ clientPhone: e.target.value })}
            className="bg-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring"
            placeholder="(555) 000-0000"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="booking-notes" className="text-xs tracking-widest uppercase text-muted-foreground">
            Notes (optional)
          </label>
          <textarea
            id="booking-notes"
            rows={3}
            value={booking.notes}
            onChange={(e) => onUpdate({ notes: e.target.value })}
            className="bg-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring resize-none"
            placeholder="Any special requests or allergies..."
          />
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="bg-primary text-primary-foreground px-8 py-3.5 text-xs tracking-widest uppercase transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed mt-2"
        >
          Review Booking
        </button>
      </form>
    </div>
  )
}
