import type { Metadata } from "next"
import { BookingFlow } from "@/components/booking/booking-flow"

export const metadata: Metadata = {
  title: "Book an Appointment | Valau Spa",
  description:
    "Schedule your luxury spa treatment at Valau Spa. Choose a service, pick your time, and confirm your booking.",
}

export default function BookingPage() {
  return (
    <>
      <section className="py-20 md:py-28 bg-secondary">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Reservation
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground text-balance">
            Book Your Experience
          </h1>
          <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
            Select a service, choose your preferred date and time, and we will take care of the rest.
          </p>
        </div>
      </section>

      <BookingFlow />
    </>
  )
}
