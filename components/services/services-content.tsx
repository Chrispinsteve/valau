"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Clock, DollarSign } from "lucide-react"
import { services, categories } from "@/lib/spa-data"
import { cn } from "@/lib/utils"

export function ServicesContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") || "all"
  const [activeCategory, setActiveCategory] = useState(initialCategory)

  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter((s) => s.category === activeCategory)

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-5 py-2 text-xs tracking-widest uppercase transition-colors",
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:text-foreground hover:border-foreground"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col sm:flex-row gap-6 p-6 bg-card border border-border/50 transition-shadow hover:shadow-sm"
            >
              <div className="relative w-full sm:w-40 h-48 sm:h-auto shrink-0 overflow-hidden">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">
                    {categories.find((c) => c.id === service.category)?.label}
                  </p>
                  <h3 className="font-serif text-xl text-foreground mb-2">
                    {service.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {service.duration} min
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3.5 w-3.5" />
                      {service.price}
                    </span>
                  </div>
                  <Link
                    href={`/booking?service=${service.id}`}
                    className="text-xs tracking-widest uppercase text-foreground underline underline-offset-4 hover:no-underline transition-all"
                  >
                    Book
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
