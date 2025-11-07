// Data layer - reads from Vercel KV
import { getContent } from './storage'

// Transform pricing plans to match frontend format
function transformPricingPlans(plans: any[]) {
  return plans.map((plan) => ({
    name: plan.name,
    description: plan.description,
    monthlyPrice: plan.monthlyPrice,
    yearlyPrice: plan.yearlyPrice,
    features: plan.features,
    buttonText: plan.buttonText,
    popular: plan.isPopular,
    comingSoon: plan.isComingSoon,
  }))
}

// Main function to get all page data
export async function getPageData() {
  const content: any = await getContent()

  return {
    siteSettings: content.siteSettings,
    heroSection: content.heroSection,
    services: content.services,
    footerServices: content.services.filter((s: any) => s.showInFooter),
    pricingPlans: transformPricingPlans(content.pricingPlans),
  }
}

// Get site settings for metadata
export async function getSiteSettings() {
  const content: any = await getContent()
  return content.siteSettings
}
