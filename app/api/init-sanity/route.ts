import { createClient } from '@sanity/client'
import { NextResponse } from 'next/server'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'yw61au22',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-11-03',
  token: process.env.SANITY_API_TOKEN,
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
    companyName: 'AI Agency',
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
]

export async function POST() {
  try {
    // Check if token exists
    if (!process.env.SANITY_API_TOKEN) {
      return NextResponse.json(
        {
          error: 'No API token configured. Please add SANITY_API_TOKEN to your environment variables.',
          instructions: 'Go to https://sanity.io/manage/personal/tokens and create a token with Editor permissions.'
        },
        { status: 401 }
      )
    }

    const results = []

    for (const doc of initialData) {
      try {
        if (doc._id) {
          // Create or replace singleton documents
          const result = await client.createOrReplace(doc)
          results.push({ success: true, id: result._id, type: result._type })
        } else {
          // Create new documents
          const result = await client.create(doc)
          results.push({ success: true, id: result._id, type: result._type })
        }
      } catch (error: any) {
        results.push({ success: false, error: error.message, doc: doc._type })
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Data populated successfully!',
      results,
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Failed to populate data',
        details: error.message,
        hint: 'Make sure your SANITY_API_TOKEN has Editor permissions'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Send a POST request to this endpoint to populate Sanity with initial data',
    requiredEnvVar: 'SANITY_API_TOKEN',
  })
}
