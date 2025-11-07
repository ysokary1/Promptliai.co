// Data layer with fallback support for custom backend
import {
  getSiteSettings,
  getHeroSection,
  getServices,
  getFooterServices,
  getPricingPlans,
} from './api.client'

// Fallback data - same structure as Sanity fallbacks
const fallbackSiteSettings = {
  id: 1,
  title: 'Promptli Ai | Never Miss a Lead, Never Miss a Buyer',
  description:
    'Transform your business communications with AI-powered automation. Get instant responses, 24/7 availability, and seamless integration.',
  phone: '+1 (555) 123-4567',
  email: 'hello@promptli.ai',
  address: '123 AI Street, Tech City, TC 12345',
  company_name: 'Promptli Ai',
  company_description: 'Leading provider of AI-powered business communication solutions',
  linkedin_url: 'https://linkedin.com/company/promptliai',
  twitter_url: 'https://twitter.com/promptliai',
  facebook_url: 'https://facebook.com/promptliai',
}

const fallbackHeroSection = {
  id: 1,
  heading: 'Never Miss a Lead, Never Miss a Buyer',
  subheading:
    'Transform your business communications with AI-powered automation that responds instantly, 24/7. Capture every opportunity while you focus on growing your business.',
  primary_button_text: 'Get Started Free',
  secondary_button_text: 'Book a Demo',
  badge1: 'No credit card required',
  badge2: '14-day free trial',
}

const fallbackServices = [
  {
    id: 1,
    name: '24/7 AI Chatbot',
    description:
      'Never miss a customer inquiry with our intelligent chatbot that responds instantly, any time of day or night.',
    icon: 'bot',
    display_order: 1,
    show_in_footer: 1,
  },
  {
    id: 2,
    name: 'Custom Workflows',
    description:
      'Design automated workflows tailored to your business needs. From lead capture to customer support.',
    icon: 'workflow',
    display_order: 2,
    show_in_footer: 1,
  },
  {
    id: 3,
    name: 'Smart Integration',
    description:
      'Seamlessly connect with your existing tools and platforms. CRM, email, calendar, and more.',
    icon: 'cog',
    display_order: 3,
    show_in_footer: 1,
  },
]

const fallbackPricingPlans = [
  {
    id: 1,
    name: 'Starter',
    monthly_price: 49,
    yearly_price: 470,
    period: 'month',
    description: 'Perfect for small businesses just getting started with AI automation',
    button_text: 'Start Free Trial',
    is_popular: 0,
    is_coming_soon: 0,
    display_order: 1,
    features: [
      '1,000 conversations/month',
      'Basic AI training',
      'Email support',
      '2 integrations',
      'Analytics dashboard',
    ],
  },
  {
    id: 2,
    name: 'Professional',
    monthly_price: 149,
    yearly_price: 1430,
    period: 'month',
    description: 'For growing businesses that need advanced automation and priority support',
    button_text: 'Start Free Trial',
    is_popular: 1,
    is_coming_soon: 0,
    display_order: 2,
    features: [
      '10,000 conversations/month',
      'Advanced AI training',
      'Priority support',
      'Unlimited integrations',
      'Advanced analytics',
      'Custom workflows',
      'API access',
    ],
  },
  {
    id: 3,
    name: 'Enterprise',
    monthly_price: 499,
    yearly_price: 4790,
    period: 'month',
    description: 'For large organizations with custom requirements and dedicated support',
    button_text: 'Contact Sales',
    is_popular: 0,
    is_coming_soon: 0,
    display_order: 3,
    features: [
      'Unlimited conversations',
      'Custom AI models',
      'Dedicated account manager',
      'White-label solution',
      'Custom integrations',
      'SLA guarantee',
      '24/7 phone support',
      'On-premise deployment',
    ],
  },
]

// Transform pricing plans to match the frontend format
function transformPricingPlans(plans: any[]) {
  return plans.map((plan) => ({
    name: plan.name,
    description: plan.description,
    monthlyPrice: plan.monthly_price,
    yearlyPrice: plan.yearly_price,
    features: plan.features,
    buttonText: plan.button_text,
    popular: plan.is_popular === 1,
    comingSoon: plan.is_coming_soon === 1,
  }))
}

// Transform site settings to match the frontend format
function transformSiteSettings(settings: any) {
  return {
    title: settings.title,
    description: settings.description,
    phone: settings.phone,
    email: settings.email,
    address: settings.address,
    companyName: settings.company_name,
    companyDescription: settings.company_description,
    socialLinks: {
      linkedin: settings.linkedin_url,
      twitter: settings.twitter_url,
      facebook: settings.facebook_url,
    },
  }
}

// Transform hero section to match the frontend format
function transformHeroSection(hero: any) {
  return {
    heading: hero.heading,
    subheading: hero.subheading,
    primaryButtonText: hero.primary_button_text,
    secondaryButtonText: hero.secondary_button_text,
    badge1: hero.badge1,
    badge2: hero.badge2,
  }
}

// Main function to get all page data
export async function getPageData() {
  // Start with fallback data
  let siteSettings = transformSiteSettings(fallbackSiteSettings)
  let heroSection = transformHeroSection(fallbackHeroSection)
  let services = fallbackServices
  let footerServices = fallbackServices.filter((s) => s.show_in_footer === 1)
  let pricingPlans = transformPricingPlans(fallbackPricingPlans)

  try {
    // Try to fetch from API
    const [
      fetchedSettings,
      fetchedHero,
      fetchedServices,
      fetchedFooterServices,
      fetchedPricingPlans,
    ] = await Promise.all([
      getSiteSettings(),
      getHeroSection(),
      getServices(),
      getFooterServices(),
      getPricingPlans(),
    ])

    // Use fetched data if available
    if (fetchedSettings) {
      siteSettings = transformSiteSettings(fetchedSettings)
    }
    if (fetchedHero) {
      heroSection = transformHeroSection(fetchedHero)
    }
    if (fetchedServices.length > 0) {
      services = fetchedServices
    }
    if (fetchedFooterServices.length > 0) {
      footerServices = fetchedFooterServices
    }
    if (fetchedPricingPlans.length > 0) {
      pricingPlans = transformPricingPlans(fetchedPricingPlans)
    }
  } catch (error) {
    console.log('Using fallback data due to error:', error)
  }

  return {
    siteSettings,
    heroSection,
    services,
    footerServices,
    pricingPlans,
  }
}
