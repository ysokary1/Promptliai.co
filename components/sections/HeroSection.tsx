import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { SplineScene } from "@/components/ui/spline-scene"
import { CheckCircle, ArrowRight } from "lucide-react"

interface HeroSectionProps {
  heading?: string
  subheading?: string
  primaryButtonText?: string
  secondaryButtonText?: string
  badge1?: string
  badge2?: string
  siteSettings?: any
}

export function HeroSection({
  heading = "Results and Costs Reduced by AI",
  subheading = "Transform your business with intelligent automation and AI-powered solutions",
  primaryButtonText = "Book Free Consultation",
  secondaryButtonText = "View Case Studies",
  badge1 = "No Setup Fees",
  badge2 = "30-Day ROI Guarantee",
  siteSettings,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="container mx-auto px-4">
        <Card className="w-full h-[500px] bg-black/[0.96] relative overflow-hidden border-none">
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

          <div className="flex h-full">
            {/* Left content */}
            <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text">
                {heading}
              </h1>
              <p className="mt-4 text-neutral-300 max-w-lg">{subheading}</p>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button size="lg" className="bg-white text-black hover:bg-gray-100" asChild>
                  <a href={siteSettings?.email ? `mailto:${siteSettings.email}` : "#contact"}>
                    {primaryButtonText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-neutral-600 text-neutral-300 hover:bg-neutral-800 bg-transparent"
                >
                  {secondaryButtonText}
                </Button>
              </div>

              <div className="flex items-center gap-8 text-sm text-neutral-400 mt-6">
                {badge1 && (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>{badge1}</span>
                  </div>
                )}
                {badge2 && (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>{badge2}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right content */}
            <div className="flex-1 relative">
              <SplineScene
                scene="https://prod.spline.design/UbM7F-HZcyTbZ4y3/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
