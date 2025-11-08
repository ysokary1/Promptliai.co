import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { createPage, getPage } from '@/lib/db'

const PRIVACY_CONTENT = {
  sections: [
    {
      type: 'hero',
      heading: 'Privacy Policy',
      subheading: 'Last updated: December 2024',
    },
    {
      type: 'content',
      heading: 'Information We Collect',
      text: 'We collect information you provide directly to us, such as when you create an account, request our services, or contact us for support.\n\n• Contact information (name, email, phone number)\n• Business information and requirements\n• Communication preferences\n• Usage data and analytics',
    },
    {
      type: 'content',
      heading: 'How We Use Your Information',
      text: 'We use the information we collect to:\n\n• Provide and improve our AI services\n• Communicate with you about our services\n• Analyze usage patterns and optimize performance\n• Comply with legal obligations',
    },
    {
      type: 'content',
      heading: 'Data Security',
      text: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
    },
    {
      type: 'content',
      heading: 'Contact Us',
      text: 'If you have any questions about this Privacy Policy, please contact us at director@promptliai.co',
    },
  ],
}

const TERMS_CONTENT = {
  sections: [
    {
      type: 'hero',
      heading: 'Terms of Service',
      subheading: 'Last updated: December 2024',
    },
    {
      type: 'content',
      heading: 'Agreement to Terms',
      text: 'By accessing and using Promptli AI services, you accept and agree to be bound by the terms and provision of this agreement.',
    },
    {
      type: 'content',
      heading: 'Use License',
      text: 'Permission is granted to temporarily use our AI services for personal or commercial use. This is the grant of a license, not a transfer of title.',
    },
    {
      type: 'content',
      heading: 'Service Terms',
      text: 'We reserve the right to:\n\n• Modify or discontinue services at any time\n• Refuse service to anyone for any reason\n• Update pricing and service offerings\n• Change these terms with notice',
    },
    {
      type: 'content',
      heading: 'Limitations',
      text: 'In no event shall Promptli AI be liable for any damages arising out of the use or inability to use our services.',
    },
  ],
}

export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if pages already exist
    const existingPrivacy = await getPage('privacy', true)
    const existingTerms = await getPage('terms', true)

    const results = []

    // Create privacy page if it doesn't exist
    if (!existingPrivacy) {
      const privacy = await createPage('privacy', 'Privacy Policy', PRIVACY_CONTENT, true)
      results.push({ page: 'privacy', created: !!privacy })
    } else {
      results.push({ page: 'privacy', created: false, message: 'Already exists' })
    }

    // Create terms page if it doesn't exist
    if (!existingTerms) {
      const terms = await createPage('terms', 'Terms of Service', TERMS_CONTENT, true)
      results.push({ page: 'terms', created: !!terms })
    } else {
      results.push({ page: 'terms', created: false, message: 'Already exists' })
    }

    return NextResponse.json({
      message: 'Pages import completed',
      results,
    })
  } catch (error) {
    console.error('Import error:', error)
    return NextResponse.json({ error: 'Import failed' }, { status: 500 })
  }
}
