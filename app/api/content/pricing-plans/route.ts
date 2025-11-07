import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const contentPath = path.join(process.cwd(), 'data', 'content.json')

async function readContent() {
  const data = await fs.readFile(contentPath, 'utf-8')
  return JSON.parse(data)
}

async function writeContent(content: any) {
  await fs.writeFile(contentPath, JSON.stringify(content, null, 2), 'utf-8')
}

export async function GET() {
  try {
    const content = await readContent()
    return NextResponse.json(content.pricingPlans)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read pricing plans' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const plan = await request.json()
    const content = await readContent()

    // Generate new ID
    const maxId = content.pricingPlans.reduce((max: number, p: any) => Math.max(max, p.id), 0)
    plan.id = maxId + 1

    content.pricingPlans.push(plan)
    await writeContent(content)

    return NextResponse.json({ success: true, id: plan.id })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create pricing plan' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const plans = await request.json()
    const content = await readContent()
    content.pricingPlans = plans
    await writeContent(content)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update pricing plans' }, { status: 500 })
  }
}
