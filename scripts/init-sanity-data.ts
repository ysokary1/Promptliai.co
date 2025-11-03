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
