import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { initDatabase, createUser, getUserByEmail, updateSiteSetting } from '@/lib/db'
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

export async function POST(request: Request) {
  try {
    // Initialize database tables
    const dbInit = await initDatabase()

    if (!dbInit.success) {
      return NextResponse.json({ error: 'Failed to initialize database' }, { status: 500 })
    }

    // Create admin user if it doesn't exist
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@promptliai.co'
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

    const existingUser = await getUserByEmail(adminEmail)

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10)
      const user = await createUser(adminEmail, hashedPassword, 'Admin')

      if (!user) {
        return NextResponse.json({ error: 'Failed to create admin user' }, { status: 500 })
      }
    }

    // Initialize site settings and all sections
    await Promise.all([
      updateSiteSetting('siteSettings', defaultSiteSettings),
      updateSiteSetting('heroSection', defaultHeroSection),
      updateSiteSetting('problemSolution', defaultProblemSolution),
      updateSiteSetting('servicesSection', defaultServicesSection),
      updateSiteSetting('services', defaultServices),
      updateSiteSetting('benefits', defaultBenefits),
      updateSiteSetting('process', defaultProcess),
      updateSiteSetting('ctaSection', defaultCTA),
      updateSiteSetting('navigation', defaultNavigation),
      updateSiteSetting('footerNav', defaultFooterNav),
      updateSiteSetting('pricingPlans', defaultPricingPlans),
    ])

    return NextResponse.json({
      message: 'Database initialized successfully',
      adminEmail,
      note: 'Please change the admin password after first login',
    })
  } catch (error) {
    console.error('Initialization error:', error)
    return NextResponse.json({ error: 'Initialization failed' }, { status: 500 })
  }
}
