import { Button } from "@/components/ui/button"
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background"
import { SparklesCore } from "@/components/ui/sparkles"
import { ArrowRight } from "lucide-react"

interface CTASectionProps {
  title?: string
  subtitle?: string
  primaryButtonText?: string
  primaryButtonLink?: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
  backgroundStyle?: string
}

export function CTASection({
  title = "Ready to Transform Your Business?",
  subtitle = "Join hundreds of companies already using AI to scale their operations",
  primaryButtonText = "Get Started Today",
  primaryButtonLink = "#pricing",
  secondaryButtonText = "Schedule a Demo",
  secondaryButtonLink = "#contact",
  backgroundStyle = "gradient",
}: CTASectionProps) {
  const renderBackground = () => {
    if (backgroundStyle === "gradient") {
      return (
        <AnimatedGradientBackground
          Breathing={true}
          gradientColors={["#0A0A0A", "#2979FF", "#FF80AB", "#FF6D00", "#FFD600", "#00E676", "#3D5AFE"]}
          className="absolute inset-0 opacity-50"
        />
      )
    } else if (backgroundStyle === "pattern") {
      return (
        <div className="absolute inset-0">
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>
      )
    }
    return null
  }

  return (
    <section className="relative py-24 overflow-hidden">
      {renderBackground()}

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold text-white">{title}</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">{subtitle}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100" asChild>
              <a href={primaryButtonLink}>
                {primaryButtonText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            {secondaryButtonText && (
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                asChild
              >
                <a href={secondaryButtonLink}>{secondaryButtonText}</a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
