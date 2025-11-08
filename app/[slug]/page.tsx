import { notFound } from 'next/navigation'
import { getPage } from '@/lib/db'
import { DynamicPageRenderer } from '@/components/page-renderer'

export default async function DynamicPage({ params }: { params: { slug: string } }) {
  const page = await getPage(params.slug)

  if (!page) {
    notFound()
  }

  return <DynamicPageRenderer page={page} />
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const page = await getPage(params.slug)

  if (!page) {
    return {
      title: 'Page Not Found',
    }
  }

  return {
    title: page.title,
    description: page.content?.seo?.description || page.title,
  }
}
