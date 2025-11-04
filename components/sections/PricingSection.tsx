import { Pricing } from "@/components/ui/pricing"

interface PricingPlan {
  _id: string
  name: string
  monthlyPrice: number
  yearlyPrice: number
  period: string
  description: string
  features: string[]
  buttonText: string
  isPopular?: boolean
  isComingSoon?: boolean
  order: number
}

interface PricingSectionProps {
  title?: string
  subtitle?: string
  showToggle?: boolean
  plans: PricingPlan[]
}

export function PricingSection({
  title = "Simple, Transparent Pricing",
  subtitle = "Flexible pricing designed to scale with your business growth\nAll plans include setup, training, and 30-day money-back guarantee",
  showToggle = true,
  plans,
}: PricingSectionProps) {
  return (
    <section className="py-24 bg-black flex justify-center">
      <div className="w-full max-w-7xl">
        <Pricing
          title={title}
          description={subtitle}
          plans={plans}
          showToggle={showToggle}
        />
      </div>
    </section>
  )
}
