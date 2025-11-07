import { NextResponse } from 'next/server'
import { getContent, updatePricingPlans } from '@/lib/storage'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const updatedPlan = await request.json()
    const content: any = await getContent()

    const index = content.pricingPlans.findIndex((p: any) => p.id === id)
    if (index === -1) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 })
    }

    content.pricingPlans[index] = { ...updatedPlan, id }
    const success = await updatePricingPlans(content.pricingPlans)

    if (!success) {
      return NextResponse.json({ error: 'Failed to save plan' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update plan' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const content: any = await getContent()

    content.pricingPlans = content.pricingPlans.filter((p: any) => p.id !== id)
    const success = await updatePricingPlans(content.pricingPlans)

    if (!success) {
      return NextResponse.json({ error: 'Failed to delete plan' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete plan' }, { status: 500 })
  }
}
