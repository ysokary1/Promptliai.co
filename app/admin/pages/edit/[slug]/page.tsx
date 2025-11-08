'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { ArrowLeft, Save, Eye } from 'lucide-react'
import Link from 'next/link'

export default function EditPagePage() {
  const params = useParams()
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [page, setPage] = useState<any>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  useEffect(() => {
    if (params.slug) {
      loadPage()
    }
  }, [params.slug])

  async function loadPage() {
    setLoading(true)
    try {
      const response = await fetch(`/api/pages/${params.slug}`)
      if (response.ok) {
        const data = await response.json()
        setPage(data.page)
      } else {
        toast.error('Page not found')
        router.push('/admin')
      }
    } catch (error) {
      toast.error('Failed to load page')
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    setSaving(true)
    try {
      const response = await fetch(`/api/pages/${params.slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(page),
      })

      if (response.ok) {
        toast.success('Page updated successfully!')
      } else {
        toast.error('Failed to update page')
      }
    } catch (error) {
      toast.error('Failed to update page')
    } finally {
      setSaving(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!session || !page) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="flex h-16 items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Edit Page</h1>
          </div>
          <div className="flex items-center gap-2">
            <a href={`/${page.slug}`} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </a>
            <Button onClick={handleSave} disabled={saving} size="sm">
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 max-w-4xl mx-auto">
        <div className="space-y-6">
          {/* Page Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Page Settings</CardTitle>
              <CardDescription>Basic page information and settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Page Title</Label>
                <Input
                  id="title"
                  value={page.title || ''}
                  onChange={(e) => setPage({ ...page, title: e.target.value })}
                  placeholder="Enter page title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">www.promptliai.co/</span>
                  <Input
                    id="slug"
                    value={page.slug || ''}
                    disabled
                    className="bg-gray-100"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  URL cannot be changed after creation
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="published">Published</Label>
                  <p className="text-sm text-gray-500">
                    Make this page visible to visitors
                  </p>
                </div>
                <Switch
                  id="published"
                  checked={page.is_published || false}
                  onCheckedChange={(checked) =>
                    setPage({ ...page, is_published: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Page Content */}
          <Card>
            <CardHeader>
              <CardTitle>Page Content</CardTitle>
              <CardDescription>
                Edit your page content (JSON editor - visual editor coming soon!)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={JSON.stringify(page.content || {}, null, 2)}
                onChange={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value)
                    setPage({ ...page, content: parsed })
                  } catch (err) {
                    // Invalid JSON, don't update
                  }
                }}
                rows={20}
                className="font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-2">
                💡 Visual editor with drag & drop sections coming in Phase 2!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
