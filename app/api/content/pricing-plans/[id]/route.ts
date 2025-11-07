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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const updatedPlan = await request.json()
    const content = await readContent()

    const index = content.pricingPlans.findIndex((p: any) => p.id === id)
    if (index === -1) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 })
    }

    content.pricingPlans[index] = { ...updatedPlan, id }
    await writeContent(content)

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
    const content = await readContent()

    content.pricingPlans = content.pricingPlans.filter((p: any) => p.id !== id)
    await writeContent(content)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete plan' }, { status: 500 })
  }
}
