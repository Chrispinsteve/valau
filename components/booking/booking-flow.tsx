"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { services, type BookingData } from "@/lib/spa-data"
import { StepIndicator } from "./step-indicator"
import { StepService } from "./step-service"
import { StepDate } from "./step-date"
import { StepTime } from "./step-time"
import { StepInfo } from "./step-info"
import { StepConfirm } from "./step-confirm"
import { BookingSuccess } from "./booking-success"

const steps = [
  { id: 1, label: "Service" },
  { id: 2, label: "Date" },
  { id: 3, label: "Time" },
  { id: 4, label: "Details" },
  { id: 5, label: "Confirm" },
]

export function BookingFlow() {
  const searchParams = useSearchParams()
  const preselectedService = searchParams.get("service")

  const [currentStep, setCurrentStep] = useState(1)
  const [booking, setBooking] = useState<BookingData>({
    service: null,
    date: null,
    time: null,
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    notes: "",
  })
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    if (preselectedService) {
      const found = services.find((s) => s.id === preselectedService)
      if (found) {
        setBooking((prev) => ({ ...prev, service: found }))
        setCurrentStep(2)
      }
    }
  }, [preselectedService])

  const updateBooking = (data: Partial<BookingData>) => {
    setBooking((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  const handleConfirm = () => {
    setConfirmed(true)
  }

  if (confirmed) {
    return <BookingSuccess booking={booking} />
  }

  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-2xl px-6">
        <StepIndicator steps={steps} currentStep={currentStep} />

        <div className="mt-10">
          {currentStep === 1 && (
            <StepService
              selected={booking.service}
              onSelect={(service) => {
                updateBooking({ service })
                nextStep()
              }}
            />
          )}
          {currentStep === 2 && (
            <StepDate
              selected={booking.date}
              onSelect={(date) => {
                updateBooking({ date, time: null })
                nextStep()
              }}
              onBack={prevStep}
            />
          )}
          {currentStep === 3 && booking.service && booking.date && (
            <StepTime
              date={booking.date}
              serviceDuration={booking.service.duration}
              selected={booking.time}
              onSelect={(time) => {
                updateBooking({ time })
                nextStep()
              }}
              onBack={prevStep}
            />
          )}
          {currentStep === 4 && (
            <StepInfo
              booking={booking}
              onUpdate={updateBooking}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {currentStep === 5 && (
            <StepConfirm
              booking={booking}
              onConfirm={handleConfirm}
              onBack={prevStep}
            />
          )}
        </div>
      </div>
    </section>
  )
}
