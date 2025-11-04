import {
  getSiteSettings,
  getHeroSection,
  getServices,
  getFooterServices,
  getPricingPlans,
  getProcessSection,
  getStatsSection,
  getCTASection,
} from './sanity.queries'

// Fallback data
const fallbackSiteSettings = {
  title: 'Promptli Ai | Never Miss a Lead, Never Miss a Buyer',
  description:
    'Transform your business with AI-powered automation, chatbots, and intelligent solutions that work 24/7',
  phone: '+447917066682',
  email: 'director@promptliai.co',
  address: '123 AI Street, Tech City',
  companyName: 'AI Agency',
  companyDescription:
    'Transforming businesses through intelligent automation and cutting-edge AI integration solutions.',
  socialLinks: {
    linkedin: '#',
    twitter: '#',
    facebook: '#',
  },
}

const fallbackHeroSection = {
  heading: 'Results and Costs Reduced by AI',
  subheading:
    'We help businesses automate workflows, build intelligent chatbots, and integrate AI agents that work 24/7 to boost productivity and drive growth.',
  primaryButtonText: 'Book Free Consultation',
  secondaryButtonText: 'View Case Studies',
  badge1: 'No Setup Fees',
  badge2: '30-Day ROI Guarantee',
}

const fallbackServices = [
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

const fallbackPricingPlans = [
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

const fallbackProcessSection = {
  title: 'Simple 3-Step Process',
  subtitle: 'From consultation to implementation, we make AI adoption seamless',
  steps: [
    {
      title: 'Book a Call',
      description: 'Schedule a free consultation to discuss your business needs and identify automation opportunities',
      icon: 'calendar',
      order: 1,
    },
    {
      title: 'AI Strategy',
      description: 'We analyze your workflows and create a custom AI strategy tailored to your specific business goals',
      icon: 'chart',
      order: 2,
    },
    {
      title: 'Implementation',
      description: 'Our team builds, tests, and deploys your AI solutions with ongoing support and optimization',
      icon: 'rocket',
      order: 3,
    },
  ],
}

const fallbackStatsSection = {
  title: 'Measurable Results That Matter',
  subtitle: 'Our clients see immediate impact on their bottom line',
  stats: [
    {
      value: '80%',
      label: 'Time Saved on Manual Tasks',
      icon: 'clock',
      order: 1,
    },
    {
      value: '300%',
      label: 'Average ROI Within 6 Months',
      icon: 'dollar-sign',
      order: 2,
    },
    {
      value: '150%',
      label: 'Increase in Lead Conversion',
      icon: 'bar-chart',
      order: 3,
    },
    {
      value: '24/7',
      label: 'Automated Customer Support',
      icon: 'trending-up',
      order: 4,
    },
  ],
}

const fallbackCTASection = {
  title: 'Ready to Transform Your Business?',
  subtitle: 'Join hundreds of companies already using AI to scale their operations',
  primaryButtonText: 'Get Started Today',
  primaryButtonLink: '#pricing',
  secondaryButtonText: 'Schedule a Demo',
  secondaryButtonLink: '#contact',
  backgroundStyle: 'gradient',
}

export async function getPageData() {
  let siteSettings = fallbackSiteSettings
  let heroSection = fallbackHeroSection
  let services = fallbackServices
  let footerServices = fallbackServices.filter((s) => s.showInFooter)
  let pricingPlans = fallbackPricingPlans
  let processSection = fallbackProcessSection
  let statsSection = fallbackStatsSection
  let ctaSection = fallbackCTASection

  try {
    const [
      fetchedSettings,
      fetchedHero,
      fetchedServices,
      fetchedFooterServices,
      fetchedPricing,
      fetchedProcess,
      fetchedStats,
      fetchedCTA,
    ] = await Promise.all([
      getSiteSettings(),
      getHeroSection(),
      getServices(),
      getFooterServices(),
      getPricingPlans(),
      getProcessSection(),
      getStatsSection(),
      getCTASection(),
    ])

    if (fetchedSettings) siteSettings = fetchedSettings
    if (fetchedHero) heroSection = fetchedHero
    if (fetchedServices && fetchedServices.length > 0) services = fetchedServices
    if (fetchedFooterServices && fetchedFooterServices.length > 0)
      footerServices = fetchedFooterServices
    if (fetchedPricing && fetchedPricing.length > 0) {
      pricingPlans = fetchedPricing.map((plan: any) => ({
        ...plan,
        price: String(plan.monthlyPrice),
        yearlyPrice: String(plan.yearlyPrice),
        href: '#contact',
      }))
    }
    if (fetchedProcess) processSection = fetchedProcess
    if (fetchedStats) statsSection = fetchedStats
    if (fetchedCTA) ctaSection = fetchedCTA
  } catch (error) {
    console.log('Using fallback data:', error)
  }

  // Transform pricing plans to match the expected format
  const transformedPricingPlans = pricingPlans.map((plan) => ({
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
    pricingPlans: transformedPricingPlans,
    processSection,
    statsSection,
    ctaSection,
  }
}
