import Image from "next/image"
import Link from "next/link"

export function ExperienceSection() {
  return (
    <section className="py-24 md:py-32 bg-secondary">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src="/images/about.jpg"
              alt="Valau Spa elegant reception"
              fill
              className="object-cover"
            />
          </div>
          <div className="max-w-lg">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
              The Valau Experience
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground leading-tight text-balance mb-6">
              Where Every Detail Is Intentional
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
              At Valau Spa, we believe beauty is not just about appearance -- it is about how you feel. 
              Every treatment is designed with purpose, using only premium products and techniques 
              refined through years of expertise.
            </p>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8">
              From the moment you step through our doors, you will be enveloped in calm. 
              Our space is your sanctuary, our service is your indulgence.
            </p>
            <Link
              href="/about"
              className="inline-block border border-border text-foreground px-8 py-3 text-xs tracking-widest uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
