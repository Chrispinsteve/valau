export interface Service {
  id: string
  name: string
  category: "facial" | "massage" | "body" | "waxing" | "lash"
  description: string
  duration: number // minutes
  price: number
  image: string
}

export interface TimeSlot {
  time: string
  available: boolean
}

export interface BookingData {
  service: Service | null
  date: Date | null
  time: string | null
  clientName: string
  clientEmail: string
  clientPhone: string
  notes: string
}

export interface Appointment {
  id: string
  service: Service
  date: string
  time: string
  clientName: string
  clientEmail: string
  clientPhone: string
  notes: string
  status: "confirmed" | "cancelled" | "completed"
  createdAt: string
}

export const services: Service[] = [
  {
    id: "signature-facial",
    name: "Signature Facial",
    category: "facial",
    description:
      "A customized facial tailored to your skin's unique needs. Includes deep cleansing, exfoliation, extraction, and a hydrating mask.",
    duration: 60,
    price: 120,
    image: "/images/services-facial.jpg",
  },
  {
    id: "hydra-glow",
    name: "Hydra Glow Treatment",
    category: "facial",
    description:
      "An advanced hydrating facial using premium serums and LED therapy to restore your skin's natural radiance.",
    duration: 75,
    price: 165,
    image: "/images/services-facial.jpg",
  },
  {
    id: "anti-aging-facial",
    name: "Anti-Aging Luxury Facial",
    category: "facial",
    description:
      "Targeted anti-aging treatment with collagen-boosting peptides, microcurrent therapy, and a firming mask.",
    duration: 90,
    price: 210,
    image: "/images/services-facial.jpg",
  },
  {
    id: "swedish-massage",
    name: "Swedish Relaxation Massage",
    category: "massage",
    description:
      "A classic full-body massage using long, flowing strokes to ease tension and promote deep relaxation.",
    duration: 60,
    price: 110,
    image: "/images/services-massage.jpg",
  },
  {
    id: "deep-tissue",
    name: "Deep Tissue Massage",
    category: "massage",
    description:
      "Focused pressure on deep muscle layers to relieve chronic tension and knots. Ideal for active lifestyles.",
    duration: 60,
    price: 130,
    image: "/images/services-massage.jpg",
  },
  {
    id: "hot-stone",
    name: "Hot Stone Therapy",
    category: "massage",
    description:
      "Warm basalt stones placed on key pressure points combined with massage techniques for ultimate relaxation.",
    duration: 75,
    price: 155,
    image: "/images/services-massage.jpg",
  },
  {
    id: "body-scrub",
    name: "Luxury Body Scrub",
    category: "body",
    description:
      "A full-body exfoliation using organic sugar crystals and essential oils, leaving skin silky smooth.",
    duration: 45,
    price: 95,
    image: "/images/services-body.jpg",
  },
  {
    id: "body-wrap",
    name: "Detox Body Wrap",
    category: "body",
    description:
      "A nourishing body wrap infused with seaweed and minerals to detoxify, hydrate, and firm the skin.",
    duration: 60,
    price: 140,
    image: "/images/services-body.jpg",
  },
  {
    id: "lash-extensions",
    name: "Classic Lash Extensions",
    category: "lash",
    description:
      "Natural-looking individual lash extensions applied one-by-one for a subtle yet stunning enhancement.",
    duration: 90,
    price: 180,
    image: "/images/services-facial.jpg",
  },
  {
    id: "brow-wax",
    name: "Brow Sculpting & Wax",
    category: "waxing",
    description:
      "Expert brow shaping using precision waxing and trimming to frame your face beautifully.",
    duration: 20,
    price: 35,
    image: "/images/services-facial.jpg",
  },
]

export const categories = [
  { id: "all", label: "All Services" },
  { id: "facial", label: "Facials" },
  { id: "massage", label: "Massage" },
  { id: "body", label: "Body Treatments" },
  { id: "lash", label: "Lash" },
  { id: "waxing", label: "Waxing" },
]

export const businessHours: Record<string, { open: string; close: string } | null> = {
  monday: { open: "09:00", close: "19:00" },
  tuesday: { open: "09:00", close: "19:00" },
  wednesday: { open: "09:00", close: "19:00" },
  thursday: { open: "09:00", close: "20:00" },
  friday: { open: "09:00", close: "20:00" },
  saturday: { open: "10:00", close: "18:00" },
  sunday: null,
}

export function generateTimeSlots(date: Date, serviceDuration: number): TimeSlot[] {
  const dayName = date
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase()
  const hours = businessHours[dayName]

  if (!hours) return []

  const slots: TimeSlot[] = []
  const [openHour, openMin] = hours.open.split(":").map(Number)
  const [closeHour, closeMin] = hours.close.split(":").map(Number)

  const openMinutes = openHour * 60 + openMin
  const closeMinutes = closeHour * 60 + closeMin

  for (let time = openMinutes; time + serviceDuration <= closeMinutes; time += 30) {
    const hour = Math.floor(time / 60)
    const min = time % 60
    const timeStr = `${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayTime = `${displayHour}:${min.toString().padStart(2, "0")} ${ampm}`

    slots.push({
      time: displayTime,
      available: Math.random() > 0.2, // Simulated availability
    })
  }

  return slots
}
