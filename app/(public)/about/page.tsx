import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Sparkles, Heart, Leaf } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us | Valau Spa",
  description:
    "Learn about Valau Spa's philosophy, our commitment to luxury beauty treatments, and why we believe in beauty with a purpose.",
}

const values = [
  {
    icon: Sparkles,
    title: "Intentional Beauty",
    description:
      "Every treatment is designed with purpose. We don't believe in shortcuts -- only in results that honor your natural beauty.",
  },
  {
    icon: Heart,
    title: "Personalized Care",
    description:
      "No two clients are the same. We tailor each experience to your unique needs, preferences, and wellness goals.",
  },
  {
    icon: Leaf,
    title: "Premium Products",
    description:
      "We source only the finest, responsibly-made skincare and wellness products that deliver visible, lasting results.",
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Our Story
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground text-balance">
            Beauty with a Purpose
          </h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/about.jpg"
                alt="Inside Valau Spa"
                fill
                className="object-cover"
              />
            </div>
            <div className="max-w-lg">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6 leading-tight">
                A Sanctuary in the Heart of Greenacres
              </h2>
              <div className="flex flex-col gap-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                <p>
                  Valau Spa was born from a simple belief: beauty should be intentional, 
                  and luxury should be accessible. Nestled on South Jog Road in Greenacres, Florida, 
                  our spa is a retreat from the everyday.
                </p>
                <p>
                  We crafted every detail of our space and menu of services to make you feel 
                  seen, cared for, and renewed. From our signature facials to our deeply 
                  restorative massage therapies, each offering reflects our commitment to 
                  excellence and your well-being.
                </p>
                <p>
                  At Valau, we don't chase trends. We honor timeless beauty and invest in 
                  techniques, products, and an atmosphere that deliver real transformation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Our Philosophy
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground text-balance">
              What Guides Us
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="text-center p-8">
                <value.icon className="h-6 w-6 mx-auto mb-5 text-foreground" strokeWidth={1.5} />
                <h3 className="font-serif text-lg text-foreground mb-3">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 text-center">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6 text-balance">
            Experience the Difference
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto leading-relaxed mb-10">
            Come discover what intentional beauty feels like. We would love to welcome you.
          </p>
          <Link
            href="/booking"
            className="inline-block bg-primary text-primary-foreground px-10 py-4 text-xs tracking-widest uppercase transition-opacity hover:opacity-90"
          >
            Book Your Visit
          </Link>
        </div>
      </section>
    </>
  )
}
