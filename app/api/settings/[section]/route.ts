import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getSiteSetting, updateSiteSetting } from '@/lib/db'
import {
  defaultSiteSettings,
  defaultHeroSection,
  defaultProblemSolution,
  defaultServicesSection,
  defaultServices,
  defaultBenefits,
  defaultProcess,
  defaultCTA,
  defaultNavigation,
  defaultFooterNav,
  defaultPricingPlans
} from '@/lib/data'

// Map section names to setting keys
const sectionKeyMap: Record<string, string> = {
  hero: 'heroSection',
  problemSolution: 'problemSolution',
  servicesSection: 'servicesSection',
  services: 'services',
  benefits: 'benefits',
  process: 'process',
  cta: 'ctaSection',
  navigation: 'navigation',
  footerNav: 'footerNav',
  pricing: 'pricingPlans',
  settings: 'siteSettings',
}

// Default data for each section
const defaultData: Record<string, any> = {
  heroSection: defaultHeroSection,
  problemSolution: defaultProblemSolution,
  servicesSection: defaultServicesSection,
  services: defaultServices,
  benefits: defaultBenefits,
  process: defaultProcess,
  ctaSection: defaultCTA,
  navigation: defaultNavigation,
  footerNav: defaultFooterNav,
  pricingPlans: defaultPricingPlans,
  siteSettings: defaultSiteSettings,
}

export async function GET(
  request: Request,
  { params }: { params: { section: string } }
) {
  try {
    const section = params.section
    const key = sectionKeyMap[section]

    if (!key) {
      return NextResponse.json({ error: 'Invalid section' }, { status: 400 })
    }

    let data = await getSiteSetting(key)

    // If no data in database, return default data
    if (!data) {
      data = defaultData[key]
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function POST(
  request: Request,
  { params }: { params: { section: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const section = params.section
    const key = sectionKeyMap[section]

    if (!key) {
      return NextResponse.json({ error: 'Invalid section' }, { status: 400 })
    }

    const body = await request.json()

    const result = await updateSiteSetting(key, body)

    if (!result) {
      return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
