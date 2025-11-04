import { ProcessSection } from "./ProcessSection"
import { StatsSection } from "./StatsSection"
import { CTASection } from "./CTASection"
import { ServicesSection } from "./ServicesSection"
import { PricingSection } from "./PricingSection"
import { CustomContentSection } from "./CustomContentSection"
import { HeroSection } from "./HeroSection"
import { ProblemSolutionSection } from "./ProblemSolutionSection"
import { TestimonialsSection } from "./TestimonialsSection"

interface Section {
  _type: string
  _id?: string
  [key: string]: any
}

interface SectionRendererProps {
  sections: Section[]
  siteSettings?: any
  services?: any[]
  pricingPlans?: any[]
}

export function SectionRenderer({
  sections,
  siteSettings,
  services = [],
  pricingPlans = [],
}: SectionRendererProps) {
  if (!sections || sections.length === 0) {
    return null
  }

  return (
    <>
      {sections.map((section, index) => {
        const key = section._id || `section-${index}`

        switch (section._type) {
          case "heroSection":
            return <HeroSection key={key} {...section} siteSettings={siteSettings} />

          case "problemSolutionSection":
            return <ProblemSolutionSection key={key} {...section} />

          case "processSection":
            return <ProcessSection key={key} {...section} />

          case "statsSection":
            return <StatsSection key={key} {...section} />

          case "testimonialsSection":
            return <TestimonialsSection key={key} {...section} />

          case "ctaSection":
            return <CTASection key={key} {...section} />

          case "servicesSection":
            return <ServicesSection key={key} services={services} {...section} />

          case "pricingSection":
            return <PricingSection key={key} plans={pricingPlans} {...section} />

          case "customContent":
            return <CustomContentSection key={key} {...section} />

          default:
            console.warn(`Unknown section type: ${section._type}`)
            return null
        }
      })}
    </>
  )
}
