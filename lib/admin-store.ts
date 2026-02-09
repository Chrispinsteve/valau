import { services as defaultServices, type Service, type Appointment } from "./spa-data"

// Client-side in-memory store for admin state (since no DB integration)
// In production, this would be backed by Supabase or similar

let adminServices: Service[] = [...defaultServices]
let adminAppointments: Appointment[] = generateSampleAppointments()
let adminListeners: (() => void)[] = []

function notify() {
  adminListeners.forEach((fn) => fn())
}

export function subscribeAdmin(listener: () => void) {
  adminListeners.push(listener)
  return () => {
    adminListeners = adminListeners.filter((fn) => fn !== listener)
  }
}

// Services CRUD
export function getServices() {
  return adminServices
}

export function addService(service: Omit<Service, "id">) {
  const id = service.name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now()
  adminServices = [...adminServices, { ...service, id }]
  notify()
  return adminServices
}

export function updateService(id: string, updates: Partial<Service>) {
  adminServices = adminServices.map((s) => (s.id === id ? { ...s, ...updates } : s))
  notify()
  return adminServices
}

export function deleteService(id: string) {
  adminServices = adminServices.filter((s) => s.id !== id)
  notify()
  return adminServices
}

// Appointments
export function getAppointments() {
  return adminAppointments
}

export function updateAppointmentStatus(id: string, status: Appointment["status"]) {
  adminAppointments = adminAppointments.map((a) =>
    a.id === id ? { ...a, status } : a
  )
  notify()
  return adminAppointments
}

function generateSampleAppointments(): Appointment[] {
  const today = new Date()
  const names = [
    "Maria Rodriguez",
    "Sarah Chen",
    "Emily Williams",
    "Jessica Taylor",
    "Olivia Brown",
    "Amanda Johnson",
    "Rachel Kim",
  ]
  const emails = names.map((n) => `${n.split(" ")[0].toLowerCase()}@email.com`)
  const phones = [
    "(561) 555-1234",
    "(561) 555-5678",
    "(561) 555-9012",
    "(561) 555-3456",
    "(561) 555-7890",
    "(561) 555-2345",
    "(561) 555-6789",
  ]
  const times = ["9:00 AM", "10:30 AM", "11:00 AM", "1:00 PM", "2:30 PM", "3:00 PM", "4:30 PM"]
  const statuses: Appointment["status"][] = [
    "confirmed",
    "confirmed",
    "confirmed",
    "completed",
    "confirmed",
    "cancelled",
    "confirmed",
  ]

  return names.map((name, i) => {
    const date = new Date(today)
    date.setDate(date.getDate() + Math.floor(i / 2))
    return {
      id: `appt-${i + 1}`,
      service: defaultServices[i % defaultServices.length],
      date: date.toISOString().split("T")[0],
      time: times[i],
      clientName: name,
      clientEmail: emails[i],
      clientPhone: phones[i],
      notes: "",
      status: statuses[i],
      createdAt: new Date(Date.now() - i * 86400000).toISOString(),
    }
  })
}
