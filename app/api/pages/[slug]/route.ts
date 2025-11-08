import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getPage, updatePage, deletePage } from '@/lib/db'

// GET single page by slug
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const page = await getPage(params.slug)

    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    return NextResponse.json({ page })
  } catch (error) {
    console.error('Error fetching page:', error)
    return NextResponse.json({ error: 'Failed to fetch page' }, { status: 500 })
  }
}

// PATCH update page
export async function PATCH(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const updates: any = {}

    if (body.title !== undefined) updates.title = body.title
    if (body.content !== undefined) updates.content = body.content
    if (body.isPublished !== undefined) updates.isPublished = body.isPublished
    if (body.is_published !== undefined) updates.isPublished = body.is_published

    const page = await updatePage(params.slug, updates)

    if (!page) {
      return NextResponse.json({ error: 'Failed to update page' }, { status: 500 })
    }

    return NextResponse.json({ page })
  } catch (error) {
    console.error('Error updating page:', error)
    return NextResponse.json({ error: 'Failed to update page' }, { status: 500 })
  }
}

// DELETE page
export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const result = await deletePage(params.slug)

    if (!result.success) {
      return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting page:', error)
    return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 })
  }
}
