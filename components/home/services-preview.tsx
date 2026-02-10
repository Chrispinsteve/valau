import Image from "next/image"
import Link from "next/link"

const featured = [
  {
    title: "Facials",
    description: "Customized treatments that restore your skin's natural radiance and vitality.",
    image: "/images/services-facial.mp4",
    href: "/services?category=facial",
  },
  {
    title: "Massage",
    description: "Release tension and find deep relaxation with our expert massage therapies.",
    image: "/images/services-massage.jpg",
    href: "/services?category=massage",
  },
  {
    title: "Body Treatments",
    description: "Nourish and rejuvenate your body with our luxury scrubs and wraps.",
    image: "/images/services-body.jpg",
    href: "/services?category=body",
  },
]

export function ServicesPreview() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Our Offerings
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground text-balance">
            Curated for Your Well-Being
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {featured.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group block"
            >
              <div className="relative aspect-[3/4] overflow-hidden mb-6">
                {item.image?.endsWith('.mp4') ? (
                  <video
                    src={item.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </div>
              <h3 className="font-serif text-xl mb-2 text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-block border border-border text-foreground px-8 py-3 text-xs tracking-widest uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  )
}