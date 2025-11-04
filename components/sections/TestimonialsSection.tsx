import { Card, CardContent } from "@/components/ui/card"

interface Testimonial {
  quote: string
  name: string
  title: string
  company?: string
  rating: number
  order: number
}

interface TestimonialsSectionProps {
  title?: string
  subtitle?: string
  testimonials?: Testimonial[]
  isVisible?: boolean
}

export function TestimonialsSection({
  title = "Trusted by Growing Businesses",
  subtitle,
  testimonials = [],
  isVisible = true,
}: TestimonialsSectionProps) {
  if (!isVisible || testimonials.length === 0) {
    return null
  }

  const sortedTestimonials = [...testimonials].sort((a, b) => a.order - b.order)

  return (
    <section id="testimonials" className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
          {subtitle && <p className="text-xl text-gray-300 max-w-2xl mx-auto">{subtitle}</p>}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedTestimonials.map((testimonial, index) => (
            <Card key={index} className="bg-black/80 backdrop-blur-sm border-white/10">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex text-yellow-400">
                    {"★".repeat(testimonial.rating)}
                    {"☆".repeat(5 - testimonial.rating)}
                  </div>
                  <p className="text-gray-300">{testimonial.quote}</p>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">
                      {testimonial.title}
                      {testimonial.company && `, ${testimonial.company}`}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
