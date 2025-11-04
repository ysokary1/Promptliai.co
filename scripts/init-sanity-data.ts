import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-11-03',
  token: process.env.SANITY_API_TOKEN, // You'll need a write token for this
  useCdn: false,
})

const initialData = [
  // Site Settings
  {
    _id: 'siteSettings',
    _type: 'siteSettings',
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
  },
  // Hero Section
  {
    _id: 'heroSection',
    _type: 'heroSection',
    heading: 'Results and Costs Reduced by AI',
    subheading:
      'We help businesses automate workflows, build intelligent chatbots, and integrate AI agents that work 24/7 to boost productivity and drive growth.',
    primaryButtonText: 'Book Free Consultation',
    secondaryButtonText: 'View Case Studies',
    badge1: 'No Setup Fees',
    badge2: '30-Day ROI Guarantee',
  },
  // Process Section
  {
    _id: 'processSection',
    _type: 'processSection',
    title: 'Simple 3-Step Process',
    subtitle: 'From consultation to implementation, we make AI adoption seamless',
    steps: [
      {
        title: 'Book a Call',
        description:
          'Schedule a free consultation to discuss your business needs and identify automation opportunities',
        icon: 'calendar',
        order: 1,
      },
      {
        title: 'AI Strategy',
        description:
          'We analyze your workflows and create a custom AI strategy tailored to your specific business goals',
        icon: 'chart',
        order: 2,
      },
      {
        title: 'Implementation',
        description:
          'Our team builds, tests, and deploys your AI solutions with ongoing support and optimization',
        icon: 'rocket',
        order: 3,
      },
    ],
  },
  // Stats Section
  {
    _id: 'statsSection',
    _type: 'statsSection',
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
  },
  // CTA Section
  {
    _id: 'ctaSection',
    _type: 'ctaSection',
    title: 'Ready to Transform Your Business?',
    subtitle: 'Join hundreds of companies already using AI to scale their operations',
    primaryButtonText: 'Get Started Today',
    primaryButtonLink: '#pricing',
    secondaryButtonText: 'Schedule a Demo',
    secondaryButtonLink: '#contact',
    backgroundStyle: 'gradient',
  },
  // Services
  {
    _type: 'service',
    name: 'AI Chatbots & Virtual Assistants',
    description:
      'Intelligent conversational agents that handle customer support, lead qualification, and sales inquiries 24/7 with natural language processing.',
    icon: 'bot',
    order: 1,
    showInFooter: true,
  },
  {
    _type: 'service',
    name: 'AI Integration Services',
    description:
      'Seamlessly integrate AI capabilities into your existing e-commerce and enterprise systems with custom APIs.',
    icon: 'cog',
    order: 2,
    showInFooter: true,
  },
  {
    _type: 'service',
    name: 'Smart Analytics & Insights',
    description:
      'AI-powered analytics that provide actionable insights and predictive intelligence for better decision making.',
    icon: 'brain',
    order: 3,
    showInFooter: true,
  },
  // Pricing Plans
  {
    _type: 'pricingPlan',
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
    _type: 'pricingPlan',
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
    _type: 'pricingPlan',
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
  // Legal Pages
  {
    _type: 'legalPage',
    title: 'Privacy Policy',
    slug: { _type: 'slug', current: 'privacy' },
    lastUpdated: '2024-12-01',
    effectiveDate: '2024-01-01',
    introduction:
      'We take your privacy seriously. This policy outlines how we collect, use, and protect your personal information.',
    content: [
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Information We Collect', marks: [] }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'We collect information you provide directly to us, such as when you create an account, request our services, or contact us for support.',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [
          { _type: 'span', text: 'Contact information (name, email, phone number)', marks: [] },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: 'Business information and requirements', marks: [] }],
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: 'Usage data and analytics', marks: [] }],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'How We Use Your Information', marks: [] }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'We use the information we collect to:', marks: [] }],
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: 'Provide and improve our AI services', marks: [] }],
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: 'Communicate with you about our services', marks: [] }],
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [
          { _type: 'span', text: 'Analyze usage patterns and optimize performance', marks: [] },
        ],
      },
    ],
    contactEmail: 'director@promptliai.co',
  },
  {
    _type: 'legalPage',
    title: 'Terms of Service',
    slug: { _type: 'slug', current: 'terms' },
    lastUpdated: '2024-12-01',
    effectiveDate: '2024-01-01',
    introduction:
      'By accessing and using our AI services, you accept and agree to be bound by the terms and provision of this agreement.',
    content: [
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Service Description', marks: [] }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Promptli AI provides artificial intelligence solutions including AI chatbots, workflow automation, and custom AI integrations.',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'User Responsibilities', marks: [] }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'You agree to:', marks: [] }],
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: 'Provide accurate and complete information', marks: [] }],
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [
          { _type: 'span', text: 'Use our services in compliance with applicable laws', marks: [] },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: 'Not interfere with or disrupt our services', marks: [] }],
      },
    ],
    contactEmail: 'director@promptliai.co',
  },
]

async function initializeData() {
  console.log('🚀 Starting Sanity data initialization...\n')

  try {
    for (const doc of initialData) {
      console.log(`📝 Creating: ${doc._type} - ${doc.name || doc.title || 'Settings'}`)

      if (doc._id) {
        // Create or replace singleton documents
        await client.createOrReplace(doc)
      } else {
        // Create new documents
        await client.create(doc)
      }
    }

    console.log('\n✅ All data initialized successfully!')
    console.log('\n🎉 You can now access Sanity Studio at: http://localhost:3000/studio')
  } catch (error) {
    console.error('❌ Error initializing data:', error)
    process.exit(1)
  }
}

initializeData()
