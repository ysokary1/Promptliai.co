import { NextResponse } from 'next/server'
import { getContent, updatePricingPlans } from '@/lib/storage'

export async function GET() {
  try {
    const content: any = await getContent()
    return NextResponse.json(content.pricingPlans)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read pricing plans' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const plan = await request.json()
    const content: any = await getContent()

    // Generate new ID
    const maxId = content.pricingPlans.reduce((max: number, p: any) => Math.max(max, p.id || 0), 0)
    plan.id = maxId + 1

    content.pricingPlans.push(plan)
    const success = await updatePricingPlans(content.pricingPlans)

    if (!success) {
      return NextResponse.json({ error: 'Failed to save plan' }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: plan.id })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create pricing plan' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const plans = await request.json()
    const success = await updatePricingPlans(plans)

    if (!success) {
      return NextResponse.json({ error: 'Failed to save plans' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update pricing plans' }, { status: 500 })
  }
}
