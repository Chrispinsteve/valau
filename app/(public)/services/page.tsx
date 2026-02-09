import type { Metadata } from "next"
import { ServicesContent } from "@/components/services/services-content"

export const metadata: Metadata = {
  title: "Our Services | Valau Spa",
  description:
    "Explore our curated menu of luxury facials, massage therapies, body treatments, and more at Valau Spa.",
}

export default function ServicesPage() {
  return (
    <>
      {/* Page Header */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Our Offerings
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground text-balance">
            Services & Treatments
          </h1>
          <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
            Each treatment is thoughtfully designed to nurture your body and restore your spirit.
          </p>
        </div>
      </section>

      <ServicesContent />
    </>
  )
}
