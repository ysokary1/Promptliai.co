import { notFound } from "next/navigation"
import { Navbar } from "@/components/ui/navbar"
import { SectionRenderer } from "@/components/sections/SectionRenderer"
import { getPageBySlug, getAllPages, getSiteSettings, getServices, getPricingPlans } from "@/lib/sanity.queries"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const pages = await getAllPages()

  // Return empty array if Sanity is not configured or no pages exist
  if (!pages || !Array.isArray(pages)) {
    return []
  }

  return pages.map((page: any) => ({
    slug: page.slug.current,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageBySlug(slug)

  if (!page) {
    return {
      title: "Page Not Found",
    }
  }

  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription || `${page.title} - Promptli AI`,
  }
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params
  const page = await getPageBySlug(slug)

  if (!page) {
    notFound()
  }

  // Fetch additional data needed for sections
  const [siteSettings, services, pricingPlans] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getPricingPlans(),
  ])

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <SectionRenderer
        sections={page.sections || []}
        siteSettings={siteSettings}
        services={services}
        pricingPlans={pricingPlans}
      />
    </div>
  )
}
