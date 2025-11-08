import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { SplineScene } from "@/components/ui/spline-scene"
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background"
import { SparklesCore } from "@/components/ui/sparkles"
import { Navbar } from "@/components/ui/navbar"
import { Pricing } from "@/components/ui/pricing"
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid"
import {
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Clock,
  DollarSign,
  BarChart3,
  Bot,
  Brain,
  Cog,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
} from "lucide-react"
import { getPageData } from "@/lib/data"

export default async function HomePage() {
  const {
    siteSettings,
    heroSection,
    problemSolution,
    servicesSection,
    services,
    footerServices,
    benefits,
    process,
    ctaSection,
    navigation,
    footerNav,
    pricingPlans
  } = await getPageData()
  return (
    <div className="min-h-screen bg-black">
      {/* Navigation Component */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="container mx-auto px-4">
          <Card className="w-full h-[500px] bg-black/[0.96] relative overflow-hidden border-none">
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

            <div className="flex h-full">
              {/* Left content */}
              <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text">
                  {heroSection.heading}
                </h1>
                <p className="mt-4 text-neutral-300 max-w-lg">
                  {heroSection.subheading}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Button size="lg" className="bg-white text-black hover:bg-gray-100" asChild>
                    <a href={`mailto:${siteSettings.email}`}>
                      {heroSection.primaryButtonText}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-neutral-600 text-neutral-300 hover:bg-neutral-800 bg-transparent"
                  >
                    {heroSection.secondaryButtonText}
                  </Button>
                </div>

                <div className="flex items-center gap-8 text-sm text-neutral-400 mt-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>{heroSection.badge1}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>{heroSection.badge2}</span>
                  </div>
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

      {/* Problem & Solution Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">{problemSolution.problemHeading}</h2>
              <div className="space-y-4 text-gray-300">
                {problemSolution.problems.map((problem, index) => (
                  <p key={index} className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">✗</span>
                    {problem}
                  </p>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">{problemSolution.solutionHeading}</h3>
              <div className="space-y-4 text-gray-300">
                {problemSolution.solutions.map((solution, index) => (
                  <p key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    {solution}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">{servicesSection.heading}</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {servicesSection.subheading}
            </p>
          </div>

          <BentoGrid className="lg:grid-rows-3 max-w-6xl mx-auto">
            <BentoCard
              name="AI Integration Services"
              className="lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-4"
              background={<div className="absolute inset-0 bg-black/80 backdrop-blur-sm border border-white/10" />}
              Icon={Cog}
              description="Seamlessly integrate AI capabilities into your existing e-commerce and enterprise systems with custom APIs."
              href="#"
              cta=""
            />
            <BentoCard
              name="AI Chatbots & Virtual Assistants"
              className="lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-4"
              background={<div className="absolute inset-0 bg-black/80 backdrop-blur-sm border border-white/10" />}
              Icon={Bot}
              description="Intelligent conversational agents that handle customer support, lead qualification, and sales inquiries 24/7 with natural language processing."
              href="#"
              cta=""
            />
            <BentoCard
              name="Smart Analytics & Insights"
              className="lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-4"
              background={<div className="absolute inset-0 bg-black/80 backdrop-blur-sm border border-white/10" />}
              Icon={Brain}
              description="AI-powered analytics that provide actionable insights and predictive intelligence for better decision making."
              href="#"
              cta=""
            />
          </BentoGrid>
        </div>
      </section>

      {/* Social Proof Section */}
      <section id="testimonials" className="py-24 bg-black hidden">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Trusted by Growing Businesses</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-black/80 backdrop-blur-sm border-white/10">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                  <p className="text-gray-300">
                    "The AI chatbot increased our lead conversion by 200% and handles 90% of customer inquiries
                    automatically. ROI was evident within the first month."
                  </p>
                  <div>
                    <p className="font-semibold text-white">Sarah Johnson</p>
                    <p className="text-sm text-gray-400">CEO, TechStart Solutions</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/80 backdrop-blur-sm border-white/10">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                  <p className="text-gray-300">
                    "Workflow automation saved us 25 hours per week. Our team can now focus on strategic growth instead
                    of repetitive tasks."
                  </p>
                  <div>
                    <p className="font-semibold text-white">Michael Chen</p>
                    <p className="text-sm text-gray-400">Operations Director, GrowthCorp</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/80 backdrop-blur-sm border-white/10">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                  <p className="text-gray-300">
                    "The AI integration transformed our e-commerce platform. Sales increased by 180% with personalized
                    customer experiences."
                  </p>
                  <div>
                    <p className="font-semibold text-white">Emily Rodriguez</p>
                    <p className="text-sm text-gray-400">Founder, RetailMax</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">{benefits.heading}</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {benefits.subheading}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.stats.map((stat, index) => {
              const Icon = stat.icon === 'clock' ? Clock : stat.icon === 'dollar' ? DollarSign : stat.icon === 'chart' ? BarChart3 : TrendingUp
              const bgColor = index === 0 ? 'bg-green-900/40' : index === 1 ? 'bg-blue-900/40' : index === 2 ? 'bg-purple-900/40' : 'bg-orange-900/40'
              const iconColor = index === 0 ? 'text-green-400' : index === 1 ? 'text-blue-400' : index === 2 ? 'text-purple-400' : 'text-orange-400'

              return (
                <div key={index} className="text-center space-y-4">
                  <div className={`h-16 w-16 ${bgColor} rounded-full flex items-center justify-center mx-auto`}>
                    <Icon className={`h-8 w-8 ${iconColor}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                  <p className="text-gray-300">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-black flex justify-center">
        <div className="w-full max-w-7xl">
          <Pricing
            title="Choose Your AI Transformation Plan"
            description="Flexible pricing designed to scale with your business growth\nAll plans include setup, training, and 30-day money-back guarantee"
            plans={pricingPlans}
          />
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">{process.heading}</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {process.subheading}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {process.steps.map((step) => (
              <div key={step.number} className="text-center space-y-6">
                <div className="h-20 w-20 bg-white text-black rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-white">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <AnimatedGradientBackground
          Breathing={true}
          gradientColors={["#0A0A0A", "#2979FF", "#FF80AB", "#FF6D00", "#FFD600", "#00E676", "#3D5AFE"]}
          gradientStops={[35, 50, 60, 70, 80, 90, 100]}
        />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="relative h-32 w-full flex flex-col items-center justify-center">
              <div className="w-full absolute inset-0">
                <SparklesCore
                  id="ctasparticles"
                  background="transparent"
                  minSize={0.6}
                  maxSize={1.4}
                  particleDensity={100}
                  className="w-full h-full"
                  particleColor="#FFFFFF"
                  speed={0.8}
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 relative z-20 text-balance">
                {ctaSection.heading}
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-black hover:bg-gray-100" asChild>
                <a href={`mailto:${siteSettings.email}`}>
                  {ctaSection.primaryButtonText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent" asChild>
                <a href={`tel:${siteSettings.phone}`}>{ctaSection.secondaryButtonText} {siteSettings.phone}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="relative py-20 bg-black border-t border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/95 to-black/90" />

        <div className="relative z-10 container mx-auto px-4">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">{siteSettings.companyName}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {siteSettings.companyDescription}
                </p>
              </div>

              <div className="flex space-x-4">
                <a
                  href={siteSettings.socialLinks?.linkedin || '#'}
                  className="p-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={siteSettings.socialLinks?.twitter || '#'}
                  className="p-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href={siteSettings.socialLinks?.facebook || '#'}
                  className="p-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Services</h4>
              <ul className="space-y-3">
                {footerServices.map((service) => (
                  <li key={service._id}>
                    <a
                      href="#services"
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Company</h4>
              <ul className="space-y-3">
                {footerNav.companyLinks.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Get in Touch</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-300">
                  <div className="p-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                    <Mail className="h-4 w-4" />
                  </div>
                  <a href={`mailto:${siteSettings.email}`} className="hover:text-white transition-colors duration-300">
                    {siteSettings.email}
                  </a>
                </div>

                <div className="flex items-center space-x-3 text-gray-300">
                  <div className="p-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                    <Phone className="h-4 w-4" />
                  </div>
                  <a href={`tel:${siteSettings.phone}`} className="hover:text-white transition-colors duration-300">
                    {siteSettings.phone}
                  </a>
                </div>

                <div className="flex items-center space-x-3 text-gray-300">
                  <div className="p-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span>{siteSettings.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/10 mt-16 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              <p className="text-gray-400 text-center lg:text-left">© 2024 {siteSettings.companyName}. All rights reserved.</p>

              <div className="flex flex-wrap justify-center lg:justify-end space-x-8">
                <a href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
