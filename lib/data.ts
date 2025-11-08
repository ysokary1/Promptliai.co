// Default data for the website
// This will be moved to database once it's set up

import { getSiteSetting } from './db'

export const defaultSiteSettings = {
  title: 'Promptli Ai | Never Miss a Lead, Never Miss a Buyer',
  description:
    'Transform your business with AI-powered automation, chatbots, and intelligent solutions that work 24/7',
  phone: '+447917066682',
  email: 'director@promptliai.co',
  address: '123 AI Street, Tech City',
  companyName: 'Promptli AI',
  companyDescription:
    'Transforming businesses through intelligent automation and cutting-edge AI integration solutions.',
  socialLinks: {
    linkedin: '#',
    twitter: '#',
    facebook: '#',
  },
}

export const defaultHeroSection = {
  heading: 'Results and Costs Reduced by AI',
  subheading:
    'We help businesses automate workflows, build intelligent chatbots, and integrate AI agents that work 24/7 to boost productivity and drive growth.',
  primaryButtonText: 'Book Free Consultation',
  secondaryButtonText: 'View Case Studies',
  badge1: 'No Setup Fees',
  badge2: '30-Day ROI Guarantee',
}

export const defaultServices = [
  {
    _id: '1',
    name: 'AI Chatbots & Virtual Assistants',
    description:
      'Intelligent conversational agents that handle customer support, lead qualification, and sales inquiries 24/7 with natural language processing.',
    icon: 'bot',
    order: 1,
    showInFooter: true,
  },
  {
    _id: '2',
    name: 'AI Integration Services',
    description:
      'Seamlessly integrate AI capabilities into your existing e-commerce and enterprise systems with custom APIs.',
    icon: 'cog',
    order: 2,
    showInFooter: true,
  },
  {
    _id: '3',
    name: 'Smart Analytics & Insights',
    description:
      'AI-powered analytics that provide actionable insights and predictive intelligence for better decision making.',
    icon: 'brain',
    order: 3,
    showInFooter: true,
  },
]

export const defaultPricingPlans = [
  {
    _id: '1',
    name: 'Starter',
    monthlyPrice: 997,
    yearlyPrice: 797,
    period: 'month',
    description: 'Perfect for small businesses starting their AI journey',
    features: [
      'AI Chatbot for customer support',
      'Basic workflow automation (3 processes)',
      'Email integration',
      'Standard analytics dashboard',
      'Email support',
      '30-day money-back guarantee',
    ],
    buttonText: 'Start Free Trial',
    isPopular: false,
    isComingSoon: false,
    order: 1,
  },
  {
    _id: '2',
    name: 'Professional',
    monthlyPrice: 2497,
    yearlyPrice: 1997,
    period: 'month',
    description: 'Ideal for growing businesses ready to scale with AI',
    features: [
      'Advanced AI chatbot with lead qualification',
      'Complete workflow automation (10+ processes)',
      'CRM & e-commerce integrations',
      'Advanced analytics & reporting',
      'Priority phone & email support',
      'Custom AI training',
      'Monthly optimization calls',
      'ROI tracking & reporting',
    ],
    buttonText: 'Get Started',
    isPopular: true,
    isComingSoon: false,
    order: 2,
  },
  {
    _id: '3',
    name: 'Enterprise',
    monthlyPrice: 4997,
    yearlyPrice: 3997,
    period: 'month',
    description: 'Complete AI transformation for large organizations',
    features: [
      'Custom AI development & deployment',
      'Unlimited workflow automation',
      'Full system integrations',
      'Dedicated AI strategist',
      '24/7 priority support',
      'Advanced security & compliance',
      'White-label solutions',
      'Quarterly business reviews',
      'Custom training & workshops',
    ],
    buttonText: 'Contact Sales',
    isPopular: false,
    isComingSoon: true,
    order: 3,
  },
]

export async function getPageData() {
  // Fetch from database, fallback to defaults
  let siteSettings = defaultSiteSettings
  let heroSection = defaultHeroSection
  let services = defaultServices
  let pricingPlansData = defaultPricingPlans

  try {
    const dbSiteSettings = await getSiteSetting('siteSettings')
    const dbHeroSection = await getSiteSetting('heroSection')
    const dbServices = await getSiteSetting('services')
    const dbPricingPlans = await getSiteSetting('pricingPlans')

    if (dbSiteSettings) siteSettings = dbSiteSettings
    if (dbHeroSection) heroSection = dbHeroSection
    if (dbServices) services = dbServices
    if (dbPricingPlans) pricingPlansData = dbPricingPlans
  } catch (error) {
    console.log('Using default data, database not available:', error)
  }

  const footerServices = services.filter((s: any) => s.showInFooter)

  const pricingPlans = pricingPlansData.map((plan: any) => ({
    name: plan.name,
    price: String(plan.monthlyPrice),
    yearlyPrice: String(plan.yearlyPrice),
    period: plan.period,
    features: plan.features,
    description: plan.description,
    buttonText: plan.buttonText,
    href: '#contact',
    isPopular: plan.isPopular,
    isComingSoon: plan.isComingSoon,
  }))

  return {
    siteSettings,
    heroSection,
    services,
    footerServices,
    pricingPlans,
  }
}
