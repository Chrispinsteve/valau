import Link from "next/link"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl tracking-wide mb-4">
              Valau<span className="font-sans text-sm tracking-widest uppercase ml-1 opacity-60">Spa</span>
            </h3>
            <p className="text-sm leading-relaxed opacity-70 max-w-xs">
              Beauty with a Purpose. Luxury Experience. Your sanctuary for 
              premium beauty treatments in Greenacres, Florida.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs tracking-widest uppercase mb-6 opacity-60">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {[
                { href: "/services", label: "Our Services" },
                { href: "/booking", label: "Book Appointment" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs tracking-widest uppercase mb-6 opacity-60">Visit Us</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 opacity-60 shrink-0" />
                <p className="text-sm opacity-70">
                  3818 S Jog Rd<br />Greenacres, FL 33463
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 opacity-60 shrink-0" />
                <p className="text-sm opacity-70">(561) 555-0123</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 opacity-60 shrink-0" />
                <p className="text-sm opacity-70">hello@valauspa.com</p>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 mt-0.5 opacity-60 shrink-0" />
                <div className="text-sm opacity-70">
                  <p>Mon - Fri: 9am - 7pm</p>
                  <p>Saturday: 10am - 6pm</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/10 text-center">
          <p className="text-xs opacity-50">
            {new Date().getFullYear()} Valau Spa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
