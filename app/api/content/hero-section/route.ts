import { NextResponse } from 'next/server'
import { getContent, updateHeroSection } from '@/lib/storage'

export async function GET() {
  try {
    const content: any = await getContent()
    return NextResponse.json(content.heroSection)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read hero section' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const heroSection = await request.json()
    const success = await updateHeroSection(heroSection)

    if (!success) {
      return NextResponse.json({ error: 'Failed to save hero section' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update hero section' }, { status: 500 })
  }
}
