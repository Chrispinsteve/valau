import type { Metadata } from "next"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { ContactForm } from "@/components/contact/contact-form"
import { businessHours } from "@/lib/spa-data"

export const metadata: Metadata = {
  title: "Contact Us | Valau Spa",
  description:
    "Get in touch with Valau Spa. Visit us in Greenacres, FL or send us a message.",
}

const dayOrder = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

export default function ContactPage() {
  return (
    <>
      {/* Page Header */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Get in Touch
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground text-balance">
            We Would Love to Hear from You
          </h1>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-16 md:grid-cols-2">
            {/* Contact Info */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-8">Visit Our Spa</h2>
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 mt-0.5 text-muted-foreground shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Address</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      3818 S Jog Rd<br />Greenacres, FL 33463
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 mt-0.5 text-muted-foreground shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Phone</p>
                    <p className="text-sm text-muted-foreground">(561) 555-0123</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 mt-0.5 text-muted-foreground shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Email</p>
                    <p className="text-sm text-muted-foreground">hello@valauspa.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="h-5 w-5 mt-0.5 text-muted-foreground shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-medium text-foreground mb-3">Business Hours</p>
                    <div className="flex flex-col gap-1.5">
                      {dayOrder.map((day) => {
                        const hours = businessHours[day]
                        return (
                          <div key={day} className="flex justify-between text-sm gap-8">
                            <span className="text-muted-foreground capitalize">{day}</span>
                            <span className="text-foreground">
                              {hours ? `${hours.open} - ${hours.close}` : "Closed"}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-8">Send a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
