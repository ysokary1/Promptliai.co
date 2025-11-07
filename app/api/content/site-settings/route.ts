import { NextResponse } from 'next/server'
import { getContent, updateSiteSettings } from '@/lib/storage'

export async function GET() {
  try {
    const content: any = await getContent()
    return NextResponse.json(content.siteSettings)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read settings' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const settings = await request.json()
    const success = await updateSiteSettings(settings)

    if (!success) {
      return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
