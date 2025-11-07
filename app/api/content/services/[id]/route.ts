import { NextResponse } from 'next/server'
import { getContent, updateServices } from '@/lib/storage'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const updatedService = await request.json()
    const content: any = await getContent()

    const index = content.services.findIndex((s: any) => s.id === id)
    if (index === -1) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    content.services[index] = { ...updatedService, id }
    const success = await updateServices(content.services)

    if (!success) {
      return NextResponse.json({ error: 'Failed to save service' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const content: any = await getContent()

    content.services = content.services.filter((s: any) => s.id !== id)
    const success = await updateServices(content.services)

    if (!success) {
      return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 })
  }
}
