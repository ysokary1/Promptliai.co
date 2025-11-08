import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'

interface PageProps {
  page: {
    id: number
    slug: string
    title: string
    content: any
    is_published: boolean
  }
}

export function DynamicPageRenderer({ page }: PageProps) {
  const sections = page.content?.sections || []

  return (
    <div className="min-h-screen bg-black">
      {sections.map((section: any, index: number) => (
        <Section key={index} section={section} />
      ))}

      {/* If no sections, show default layout */}
      {sections.length === 0 && (
        <div className="container mx-auto px-4 py-24">
          <h1 className="text-4xl font-bold text-white mb-4">{page.title}</h1>
          <div className="prose prose-invert max-w-none">
            {page.content?.text && (
              <p className="text-gray-300">{page.content.text}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function Section({ section }: { section: any }) {
  const { type } = section

  switch (type) {
    case 'hero':
      return <HeroSection data={section} />
    case 'content':
      return <ContentSection data={section} />
    case 'features':
      return <FeaturesSection data={section} />
    case 'cta':
      return <CTASection data={section} />
    default:
      return null
  }
}

function HeroSection({ data }: { data: any }) {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          {data.heading}
        </h1>
        {data.subheading && (
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {data.subheading}
          </p>
        )}
        {(data.primaryButton || data.secondaryButton) && (
          <div className="flex gap-4 justify-center flex-wrap">
            {data.primaryButton && (
              <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                {data.primaryButton}
              </Button>
            )}
            {data.secondaryButton && (
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                {data.secondaryButton}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

function ContentSection({ data }: { data: any }) {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        {data.heading && (
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            {data.heading}
          </h2>
        )}
        {data.text && (
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
              {data.text}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

function FeaturesSection({ data }: { data: any }) {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        {data.heading && (
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            {data.heading}
          </h2>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items?.map((item: any, index: number) => (
            <Card key={index} className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-400">{item.description}</p>
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

function CTASection({ data }: { data: any }) {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-900 via-black to-purple-900">
      <div className="container mx-auto px-4 text-center">
        {data.heading && (
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
            {data.heading}
          </h2>
        )}
        {data.subheading && (
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {data.subheading}
          </p>
        )}
        {data.buttonText && (
          <Button size="lg" className="bg-white text-black hover:bg-gray-100">
            {data.buttonText}
          </Button>
        )}
      </div>
    </section>
  )
}
