"use client"

import { ArrowLeft, Calendar, Clock, User, Mail, Phone, DollarSign, FileText } from "lucide-react"
import type { BookingData } from "@/lib/spa-data"

interface StepConfirmProps {
  booking: BookingData
  onConfirm: () => void
  onBack: () => void
}

export function StepConfirm({ booking, onConfirm, onBack }: StepConfirmProps) {
  const formattedDate = booking.date?.toLocaleDateString("en-US", {
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

      <h2 className="font-serif text-2xl text-foreground mb-2">Review & Confirm</h2>
      <p className="text-sm text-muted-foreground mb-8">
        Please review your booking details before confirming.
      </p>

      <div className="border border-border p-6 md:p-8 mb-8">
        {/* Service */}
        <div className="mb-6 pb-6 border-b border-border">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">Service</p>
          <h3 className="font-serif text-lg text-foreground">{booking.service?.name}</h3>
          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {booking.service?.duration} min
            </span>
            <span className="flex items-center gap-1">
              <DollarSign className="h-3.5 w-3.5" />
              {booking.service?.price}
            </span>
          </div>
        </div>

        {/* Date & Time */}
        <div className="mb-6 pb-6 border-b border-border">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">Appointment</p>
          <div className="flex flex-col gap-2">
            <span className="flex items-center gap-2 text-sm text-foreground">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-2 text-sm text-foreground">
              <Clock className="h-4 w-4 text-muted-foreground" />
              {booking.time}
            </span>
          </div>
        </div>

        {/* Client Info */}
        <div>
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">Contact</p>
          <div className="flex flex-col gap-2">
            <span className="flex items-center gap-2 text-sm text-foreground">
              <User className="h-4 w-4 text-muted-foreground" />
              {booking.clientName}
            </span>
            <span className="flex items-center gap-2 text-sm text-foreground">
              <Mail className="h-4 w-4 text-muted-foreground" />
              {booking.clientEmail}
            </span>
            <span className="flex items-center gap-2 text-sm text-foreground">
              <Phone className="h-4 w-4 text-muted-foreground" />
              {booking.clientPhone}
            </span>
            {booking.notes && (
              <span className="flex items-start gap-2 text-sm text-foreground mt-1">
                <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                {booking.notes}
              </span>
            )}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onConfirm}
        className="w-full bg-primary text-primary-foreground py-4 text-xs tracking-widest uppercase transition-opacity hover:opacity-90"
      >
        Confirm Booking
      </button>
    </div>
  )
}
