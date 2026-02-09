"use client"

import { useState } from "react"
import { CheckCircle } from "lucide-react"

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <CheckCircle className="h-10 w-10 text-foreground mb-4" strokeWidth={1.5} />
        <h3 className="font-serif text-xl text-foreground mb-2">Message Sent</h3>
        <p className="text-sm text-muted-foreground">
          Thank you for reaching out. We will get back to you shortly.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setSubmitted(true)
      }}
      className="flex flex-col gap-5"
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-xs tracking-widest uppercase text-muted-foreground">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          required
          className="bg-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring"
          placeholder="Your name"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-xs tracking-widest uppercase text-muted-foreground">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          className="bg-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring"
          placeholder="you@email.com"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="phone" className="text-xs tracking-widest uppercase text-muted-foreground">
          Phone (optional)
        </label>
        <input
          id="phone"
          type="tel"
          className="bg-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring"
          placeholder="(555) 000-0000"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-xs tracking-widest uppercase text-muted-foreground">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          className="bg-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring resize-none"
          placeholder="How can we help you?"
        />
      </div>
      <button
        type="submit"
        className="bg-primary text-primary-foreground px-8 py-3.5 text-xs tracking-widest uppercase transition-opacity hover:opacity-90 mt-2"
      >
        Send Message
      </button>
    </form>
  )
}
