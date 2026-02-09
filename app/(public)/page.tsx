import { HeroSection } from "@/components/home/hero-section"
import { ServicesPreview } from "@/components/home/services-preview"
import { ExperienceSection } from "@/components/home/experience-section"
import { CtaSection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <ExperienceSection />
      <CtaSection />
    </>
  )
}
