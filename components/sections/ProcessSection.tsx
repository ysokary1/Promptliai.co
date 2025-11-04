import { Calendar, ChartBar, Rocket, Cog, Users, Target } from "lucide-react"

interface ProcessStep {
  title: string
  description: string
  icon: string
  order: number
}

interface ProcessSectionProps {
  title?: string
  subtitle?: string
  steps: ProcessStep[]
}

const iconMap: Record<string, any> = {
  calendar: Calendar,
  chart: ChartBar,
  rocket: Rocket,
  cog: Cog,
  users: Users,
  target: Target,
}

export function ProcessSection({ title, subtitle, steps }: ProcessSectionProps) {
  const sortedSteps = [...steps].sort((a, b) => a.order - b.order)

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {title || "Our Process"}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>

        <div className={`grid md:grid-cols-${Math.min(sortedSteps.length, 3)} gap-8`}>
          {sortedSteps.map((step, index) => (
            <div key={index} className="text-center space-y-6">
              <div className="h-20 w-20 bg-white text-black rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                {step.order}
              </div>
              <h3 className="text-xl font-bold text-white">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
