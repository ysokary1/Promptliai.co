// Default data for the website
// This will be moved to database once it's set up

import { getSiteSetting, isDatabaseInitialized } from './db'

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

export const defaultProblemSolution = {
  problemHeading: 'Still Managing Everything Manually?',
  problems: [
    'Spending hours on repetitive tasks that could be automated',
    'Missing leads because you can\'t respond to inquiries 24/7',
    'Struggling to scale operations without hiring more staff',
    'Losing competitive edge to AI-powered competitors',
  ],
  solutionHeading: 'We Build AI Solutions That Work',
  solutions: [
    'Custom AI agents that handle customer inquiries instantly',
    'Workflow automation that saves 20+ hours per week',
    'Seamless integration with your existing tools and systems',
    'Proven ROI within 30 days of implementation',
  ],
}

export const defaultServicesSection = {
  heading: 'Our AI Solutions',
  subheading: 'Comprehensive AI services designed to transform your business operations',
}

export const defaultBenefits = {
  heading: 'Measurable Results That Matter',
  subheading: 'Our clients see immediate impact on their bottom line',
  stats: [
    { value: '80%', label: 'Time Saved on Manual Tasks', icon: 'clock' },
    { value: '300%', label: 'Average ROI Within 6 Months', icon: 'dollar' },
    { value: '150%', label: 'Increase in Lead Conversion', icon: 'chart' },
    { value: '24/7', label: 'Automated Customer Support', icon: 'trending' },
  ],
}

export const defaultProcess = {
  heading: 'Simple 3-Step Process',
  subheading: 'From consultation to implementation, we make AI adoption seamless',
  steps: [
    {
      number: 1,
      title: 'Book a Call',
      description: 'Schedule a free consultation to discuss your business needs and identify automation opportunities',
    },
    {
      number: 2,
      title: 'AI Strategy',
      description: 'We analyze your workflows and create a custom AI strategy tailored to your specific business goals',
    },
    {
      number: 3,
      title: 'Implementation',
      description: 'Our team builds, tests, and deploys your AI solutions with ongoing support and optimization',
    },
  ],
}

export const defaultCTA = {
  heading: 'Ready to cut costs with AI?',
  primaryButtonText: 'Book Free Consultation',
  secondaryButtonText: 'Call Now',
}

export const defaultNavigation = {
  logo: 'Promptli AI',
  links: [
    { name: 'Services', href: '#services' },
    { name: 'Case Studies', href: '#testimonials' },
  ],
  callButtonText: 'Call Us',
  callButtonUrl: 'tel:+1234567890',
  quoteButtonText: 'Get Quote',
  quoteButtonUrl: '#contact',
}

export const defaultFooterNav = {
  companyLinks: [
    { name: 'About Us', href: '#' },
    { name: 'Case Studies', href: '#testimonials' },
    { name: 'Blog', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Contact', href: '#contact' },
  ],
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
  let problemSolution = defaultProblemSolution
  let servicesSection = defaultServicesSection
  let services = defaultServices
  let benefits = defaultBenefits
  let process = defaultProcess
  let ctaSection = defaultCTA
  let navigation = defaultNavigation
  let footerNav = defaultFooterNav
  let pricingPlansData = defaultPricingPlans

  // Check if database is initialized before querying
  const dbInitialized = await isDatabaseInitialized()

  if (dbInitialized) {
    try {
      const [
        dbSiteSettings,
        dbHeroSection,
        dbProblemSolution,
        dbServicesSection,
        dbServices,
        dbBenefits,
        dbProcess,
        dbCTA,
        dbNavigation,
        dbFooterNav,
        dbPricingPlans,
      ] = await Promise.all([
        getSiteSetting('siteSettings'),
        getSiteSetting('heroSection'),
        getSiteSetting('problemSolution'),
        getSiteSetting('servicesSection'),
        getSiteSetting('services'),
        getSiteSetting('benefits'),
        getSiteSetting('process'),
        getSiteSetting('ctaSection'),
        getSiteSetting('navigation'),
        getSiteSetting('footerNav'),
        getSiteSetting('pricingPlans'),
      ])

      if (dbSiteSettings) siteSettings = dbSiteSettings
      if (dbHeroSection) heroSection = dbHeroSection
      if (dbProblemSolution) problemSolution = dbProblemSolution
      if (dbServicesSection) servicesSection = dbServicesSection
      if (dbServices) services = dbServices
      if (dbBenefits) benefits = dbBenefits
      if (dbProcess) process = dbProcess
      if (dbCTA) ctaSection = dbCTA
      if (dbNavigation) navigation = dbNavigation
      if (dbFooterNav) footerNav = dbFooterNav
      if (dbPricingPlans) pricingPlansData = dbPricingPlans
    } catch (error) {
      console.log('Error fetching from database, using defaults:', error)
    }
  } else {
    console.log('Database not initialized, using default data')
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
    problemSolution,
    servicesSection,
    services,
    footerServices,
    benefits,
    process,
    ctaSection,
    navigation,
    footerNav,
    pricingPlans,
  }
}
