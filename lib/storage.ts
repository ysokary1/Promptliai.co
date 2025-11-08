// Storage layer using Vercel KV (Redis) with JSON fallback
import fallbackContent from '@/data/content.json'

const CONTENT_KEY = 'website:content'

// Check if KV is available
const isKVAvailable = process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN

// Lazy load KV only if available
let kv: any = null
async function getKV() {
  if (!isKVAvailable) {
    return null
  }
  if (!kv) {
    const { kv: kvClient } = await import('@vercel/kv')
    kv = kvClient
  }
  return kv
}

// Get all content
export async function getContent() {
  try {
    const kvClient = await getKV()

    if (kvClient) {
      const content = await kvClient.get(CONTENT_KEY)

      // If no content in KV, use fallback and initialize KV
      if (!content) {
        await kvClient.set(CONTENT_KEY, fallbackContent)
        return fallbackContent
      }

      return content
    }

    // If KV not available, use fallback
    return fallbackContent
  } catch (error) {
    console.error('Error fetching from KV:', error)
    return fallbackContent
  }
}

// Update all content
export async function setContent(content: any) {
  try {
    const kvClient = await getKV()

    if (kvClient) {
      await kvClient.set(CONTENT_KEY, content)
      return true
    }

    console.warn('KV not available - content not persisted')
    return false
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
