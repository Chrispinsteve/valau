import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center">
      <Image
        src="/images/hero.jpg"
        alt="Luxury spa interior with warm lighting and elegant decor"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-foreground/40" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 w-full">
        <div className="max-w-xl">
          <p className="text-xs tracking-[0.3em] uppercase text-background/70 mb-4 font-sans">
            Greenacres, Florida
          </p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-background leading-tight text-balance">
            Beauty with a Purpose
          </h1>
          <p className="mt-6 text-base md:text-lg text-background/80 leading-relaxed max-w-md font-sans">
            Indulge in premium treatments crafted for your well-being. 
            A sanctuary where luxury meets intention.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/booking"
              className="bg-background text-foreground px-8 py-3.5 text-xs tracking-widest uppercase text-center transition-opacity hover:opacity-90"
            >
              Book Your Experience
            </Link>
            <Link
              href="/services"
              className="border border-background/40 text-background px-8 py-3.5 text-xs tracking-widest uppercase text-center transition-colors hover:bg-background/10"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
