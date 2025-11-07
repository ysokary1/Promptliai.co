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
    const updatedService = await request.json()
    const content = await readContent()

    const index = content.services.findIndex((s: any) => s.id === id)
    if (index === -1) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    content.services[index] = { ...updatedService, id }
    await writeContent(content)

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
    const content = await readContent()

    content.services = content.services.filter((s: any) => s.id !== id)
    await writeContent(content)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 })
  }
}
