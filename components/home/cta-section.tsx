import Link from "next/link"

export function CtaSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
          Ready to Begin?
        </p>
        <h2 className="font-serif text-3xl md:text-5xl text-foreground text-balance mb-6">
          Your Luxury Experience Awaits
        </h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-md mx-auto mb-10">
          Book your appointment today and discover the Valau difference. 
          Premium treatments, intentional care, unforgettable results.
        </p>
        <Link
          href="/booking"
          className="inline-block bg-primary text-primary-foreground px-10 py-4 text-xs tracking-widest uppercase transition-opacity hover:opacity-90"
        >
          Book Your Appointment
        </Link>
      </div>
    </section>
  )
}
