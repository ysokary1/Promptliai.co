import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getAllPages, createPage } from '@/lib/db'

// GET all pages
export async function GET() {
  try {
    const pages = await getAllPages()
    return NextResponse.json({ pages })
  } catch (error) {
    console.error('Error fetching pages:', error)
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 })
  }
}

// POST create new page
export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { slug, title, content, isPublished } = body

    if (!slug || !title) {
      return NextResponse.json({ error: 'Slug and title are required' }, { status: 400 })
    }

    const page = await createPage(slug, title, content || {}, isPublished || false)

    if (!page) {
      return NextResponse.json({ error: 'Failed to create page' }, { status: 500 })
    }

    return NextResponse.json({ page })
  } catch (error) {
    console.error('Error creating page:', error)
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 })
  }
}
