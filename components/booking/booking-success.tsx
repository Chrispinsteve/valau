import Link from "next/link"
import { CheckCircle, Calendar, Clock } from "lucide-react"
import type { BookingData } from "@/lib/spa-data"

interface BookingSuccessProps {
  booking: BookingData
}

export function BookingSuccess({ booking }: BookingSuccessProps) {
  const formattedDate = booking.date?.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-lg px-6 text-center">
        <CheckCircle className="h-12 w-12 mx-auto text-foreground mb-6" strokeWidth={1} />
        <h2 className="font-serif text-3xl text-foreground mb-3">Booking Confirmed</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-8">
          Thank you, {booking.clientName}. Your appointment has been scheduled. 
          A confirmation will be sent to {booking.clientEmail}.
        </p>

        <div className="border border-border p-6 mb-8 text-left">
          <h3 className="font-serif text-lg text-foreground mb-4">{booking.service?.name}</h3>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {booking.time}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-primary text-primary-foreground px-8 py-3.5 text-xs tracking-widest uppercase text-center transition-opacity hover:opacity-90"
          >
            Back to Home
          </Link>
          <Link
            href="/services"
            className="border border-border text-foreground px-8 py-3.5 text-xs tracking-widest uppercase text-center transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            View Services
          </Link>
        </div>
      </div>
    </section>
  )
}
