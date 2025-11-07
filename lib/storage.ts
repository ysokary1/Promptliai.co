// Storage layer using Vercel KV (Redis)
import { kv } from '@vercel/kv'
import fallbackContent from '@/data/content.json'

const CONTENT_KEY = 'website:content'

// Get all content
export async function getContent() {
  try {
    const content = await kv.get(CONTENT_KEY)

    // If no content in KV, use fallback and initialize KV
    if (!content) {
      await kv.set(CONTENT_KEY, fallbackContent)
      return fallbackContent
    }

    return content
  } catch (error) {
    console.error('Error fetching from KV:', error)
    return fallbackContent
  }
}

// Update all content
export async function setContent(content: any) {
  try {
    await kv.set(CONTENT_KEY, content)
    return true
  } catch (error) {
    console.error('Error saving to KV:', error)
    return false
  }
}

// Update site settings only
export async function updateSiteSettings(settings: any) {
  const content: any = await getContent()
  content.siteSettings = settings
  return await setContent(content)
}

// Update hero section only
export async function updateHeroSection(hero: any) {
  const content: any = await getContent()
  content.heroSection = hero
  return await setContent(content)
}

// Update services
export async function updateServices(services: any[]) {
  const content: any = await getContent()
  content.services = services
  return await setContent(content)
}

// Update pricing plans
export async function updatePricingPlans(plans: any[]) {
  const content: any = await getContent()
  content.pricingPlans = plans
  return await setContent(content)
}
