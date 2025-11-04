import { BentoGrid, BentoCard } from "@/components/ui/bento-grid"
import { Bot, Brain, Cog, Workflow, Code } from "lucide-react"

interface Service {
  _id: string
  name: string
  description: string
  icon?: string
  order: number
}

interface ServicesSectionProps {
  title?: string
  subtitle?: string
  layout?: "grid" | "bento" | "cards"
  services: Service[]
}

const iconMap: Record<string, any> = {
  bot: Bot,
  brain: Brain,
  cog: Cog,
  workflow: Workflow,
  code: Code,
}

export function ServicesSection({
  title = "Our AI Solutions",
  subtitle = "Comprehensive AI services designed to transform your business operations",
  layout = "bento",
  services,
}: ServicesSectionProps) {
  const sortedServices = [...services].sort((a, b) => a.order - b.order)

  if (layout === "bento") {
    return (
      <section id="services" className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
            {subtitle && <p className="text-xl text-gray-300 max-w-2xl mx-auto">{subtitle}</p>}
          </div>

          <BentoGrid className="lg:grid-rows-3 max-w-6xl mx-auto">
            {sortedServices.map((service, index) => {
              const Icon = service.icon ? iconMap[service.icon] || Bot : Bot
              return (
                <BentoCard
                  key={service._id}
                  name={service.name}
                  className={`lg:col-start-${(index % 3) + 1} lg:col-end-${(index % 3) + 2} lg:row-start-1 lg:row-end-4`}
                  background={
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm border border-white/10" />
                  }
                  Icon={Icon}
                  description={service.description}
                  href="#"
                  cta=""
                />
              )
            })}
          </BentoGrid>
        </div>
      </section>
    )
  }

  // Default grid layout
  return (
    <section id="services" className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
          {subtitle && <p className="text-xl text-gray-300 max-w-2xl mx-auto">{subtitle}</p>}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {sortedServices.map((service) => {
            const Icon = service.icon ? iconMap[service.icon] || Bot : Bot
            return (
              <div
                key={service._id}
                className="p-6 bg-black/80 backdrop-blur-sm border border-white/10 rounded-lg space-y-4"
              >
                <Icon className="h-10 w-10 text-white" />
                <h3 className="text-xl font-bold text-white">{service.name}</h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
