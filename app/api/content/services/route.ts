import { NextResponse } from 'next/server'
import { getContent, updateServices } from '@/lib/storage'

export async function GET(request: Request) {
  try {
    const content: any = await getContent()
    const { searchParams } = new URL(request.url)
    const footerOnly = searchParams.get('footer') === 'true'

    if (footerOnly) {
      const footerServices = content.services.filter((s: any) => s.showInFooter)
      return NextResponse.json(footerServices)
    }

    return NextResponse.json(content.services)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read services' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const service = await request.json()
    const content: any = await getContent()

    // Generate new ID
    const maxId = content.services.reduce((max: number, s: any) => Math.max(max, s.id || 0), 0)
    service.id = maxId + 1

    content.services.push(service)
    const success = await updateServices(content.services)

    if (!success) {
      return NextResponse.json({ error: 'Failed to save service' }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: service.id })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const services = await request.json()
    const success = await updateServices(services)

    if (!success) {
      return NextResponse.json({ error: 'Failed to save services' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update services' }, { status: 500 })
  }
}
