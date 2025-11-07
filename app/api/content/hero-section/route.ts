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
    return NextResponse.json(content.heroSection)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read hero section' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const heroSection = await request.json()
    const content = await readContent()
    content.heroSection = heroSection
    await writeContent(content)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update hero section' }, { status: 500 })
  }
}
