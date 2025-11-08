'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Trash, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

interface Page {
  id: number
  slug: string
  title: string
  is_published: boolean
  created_at: string
  updated_at: string
}

export function PagesManager() {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPages()
  }, [])

  async function loadPages() {
    setLoading(true)
    try {
      const response = await fetch('/api/pages')
      if (response.ok) {
        const data = await response.json()
        setPages(data.pages || [])
      } else {
        toast.error('Failed to load pages')
      }
    } catch (error) {
      toast.error('Failed to load pages')
    } finally {
      setLoading(false)
    }
  }

  async function deletePage(slug: string) {
    if (!confirm('Are you sure you want to delete this page?')) return

    try {
      const response = await fetch(`/api/pages/${slug}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Page deleted successfully')
        loadPages()
      } else {
        toast.error('Failed to delete page')
      }
    } catch (error) {
      toast.error('Failed to delete page')
    }
  }

  async function togglePublish(slug: string, currentStatus: boolean) {
    try {
      const response = await fetch(`/api/pages/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_published: !currentStatus }),
      })

      if (response.ok) {
        toast.success(currentStatus ? 'Page unpublished' : 'Page published')
        loadPages()
      } else {
        toast.error('Failed to update page status')
      }
    } catch (error) {
      toast.error('Failed to update page status')
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading pages...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Pages</h2>
          <p className="text-sm text-gray-600">Manage all your website pages</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={async () => {
              try {
                const response = await fetch('/api/pages/import', { method: 'POST' })
                if (response.ok) {
                  toast.success('Privacy & Terms pages imported!')
                  loadPages()
                } else {
                  toast.error('Failed to import pages')
                }
              } catch (error) {
                toast.error('Failed to import pages')
              }
            }}
          >
            Import Privacy & Terms
          </Button>
          <Link href="/admin/pages/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Page
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    No pages yet. Create your first page!
                  </TableCell>
                </TableRow>
              ) : (
                pages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell className="font-medium">{page.title}</TableCell>
                    <TableCell>
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                        /{page.slug}
                      </code>
                    </TableCell>
                    <TableCell>
                      <Badge variant={page.is_published ? 'default' : 'secondary'}>
                        {page.is_published ? 'Published' : 'Draft'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(page.updated_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/admin/pages/edit/${page.slug}`}>
                          <Button variant="ghost" size="sm" title="Edit">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <a href={`/${page.slug}`} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="sm" title="View">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </a>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => togglePublish(page.slug, page.is_published)}
                          title={page.is_published ? 'Unpublish' : 'Publish'}
                        >
                          {page.is_published ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4 text-green-600" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deletePage(page.slug)}
                          title="Delete"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
