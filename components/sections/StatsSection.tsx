import {
  Clock,
  DollarSign,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Zap,
  Users,
  Target,
} from "lucide-react"

interface Stat {
  value: string
  label: string
  description?: string
  icon?: string
  order: number
}

interface StatsSectionProps {
  title?: string
  subtitle?: string
  stats: Stat[]
}

const iconMap: Record<string, any> = {
  clock: Clock,
  "dollar-sign": DollarSign,
  "bar-chart": BarChart3,
  "trending-up": TrendingUp,
  "trending-down": TrendingDown,
  zap: Zap,
  users: Users,
  target: Target,
}

const colorMap: Record<number, { bg: string; text: string }> = {
  0: { bg: "bg-green-900/40", text: "text-green-400" },
  1: { bg: "bg-blue-900/40", text: "text-blue-400" },
  2: { bg: "bg-purple-900/40", text: "text-purple-400" },
  3: { bg: "bg-orange-900/40", text: "text-orange-400" },
  4: { bg: "bg-pink-900/40", text: "text-pink-400" },
  5: { bg: "bg-cyan-900/40", text: "text-cyan-400" },
}

export function StatsSection({ title, subtitle, stats }: StatsSectionProps) {
  const sortedStats = [...stats].sort((a, b) => a.order - b.order)

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {title || "Proven Results"}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-${Math.min(sortedStats.length, 4)} gap-8`}>
          {sortedStats.map((stat, index) => {
            const Icon = stat.icon ? iconMap[stat.icon] || Clock : Clock
            const colors = colorMap[index % 6]

            return (
              <div key={index} className="text-center space-y-4">
                <div
                  className={`h-16 w-16 ${colors.bg} rounded-full flex items-center justify-center mx-auto`}
                >
                  <Icon className={`h-8 w-8 ${colors.text}`} />
                </div>
                <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                <p className="text-gray-300">{stat.label}</p>
                {stat.description && (
                  <p className="text-sm text-gray-400">{stat.description}</p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
