import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const contentPath = path.join(process.cwd(), 'data', 'content.json')

// Helper to read content
async function readContent() {
  try {
    const data = await fs.readFile(contentPath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading content:', error)
    return null
  }
}

// Helper to write content
async function writeContent(content: any) {
  try {
    await fs.writeFile(contentPath, JSON.stringify(content, null, 2), 'utf-8')
    return true
  } catch (error) {
    console.error('Error writing content:', error)
    return false
  }
}

// GET /api/content - Get all content
export async function GET() {
  const content = await readContent()

  if (!content) {
    return NextResponse.json({ error: 'Failed to read content' }, { status: 500 })
  }

  return NextResponse.json(content)
}

// PUT /api/content - Update all content
export async function PUT(request: Request) {
  try {
    const newContent = await request.json()
    const success = await writeContent(newContent)

    if (!success) {
      return NextResponse.json({ error: 'Failed to write content' }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Content updated' })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
