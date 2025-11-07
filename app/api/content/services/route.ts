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

export async function GET(request: Request) {
  try {
    const content = await readContent()
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
    const content = await readContent()

    // Generate new ID
    const maxId = content.services.reduce((max: number, s: any) => Math.max(max, s.id), 0)
    service.id = maxId + 1

    content.services.push(service)
    await writeContent(content)

    return NextResponse.json({ success: true, id: service.id })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const services = await request.json()
    const content = await readContent()
    content.services = services
    await writeContent(content)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update services' }, { status: 500 })
  }
}
