'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { ArrowLeft, Plus } from 'lucide-react'
import Link from 'next/link'

const PAGE_TEMPLATES = {
  blank: {
    name: 'Blank Page',
    description: 'Start with an empty page',
    content: { sections: [] },
  },
  basic: {
    name: 'Basic Page',
    description: 'Simple page with header and content',
    content: {
      sections: [
        {
          type: 'hero',
          heading: 'Page Title',
          subheading: 'Page description goes here',
        },
        {
          type: 'content',
          text: 'Your content here...',
        },
      ],
    },
  },
  landing: {
    name: 'Landing Page',
    description: 'Full landing page with hero, features, and CTA',
    content: {
      sections: [
        {
          type: 'hero',
          heading: 'Welcome to Our Page',
          subheading: 'Amazing products and services for you',
          primaryButton: 'Get Started',
          secondaryButton: 'Learn More',
        },
        {
          type: 'features',
          heading: 'Features',
          items: [
            { title: 'Feature 1', description: 'Description here' },
            { title: 'Feature 2', description: 'Description here' },
            { title: 'Feature 3', description: 'Description here' },
          ],
        },
        {
          type: 'cta',
          heading: 'Ready to get started?',
          buttonText: 'Sign Up Now',
        },
      ],
    },
  },
}

export default function NewPagePage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [creating, setCreating] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    template: 'blank',
    isPublished: false,
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title && !formData.slug) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
      setFormData((prev) => ({ ...prev, slug }))
    }
  }, [formData.title])

  async function handleCreate() {
    if (!formData.title || !formData.slug) {
      toast.error('Title and slug are required')
      return
    }

    setCreating(true)
    try {
      const template = PAGE_TEMPLATES[formData.template as keyof typeof PAGE_TEMPLATES]

      const response = await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          slug: formData.slug,
          content: template.content,
          isPublished: formData.isPublished,
        }),
      })

      if (response.ok) {
        toast.success('Page created successfully!')
        router.push('/admin')
      } else {
        const data = await response.json()
        toast.error(data.error || 'Failed to create page')
      }
    } catch (error) {
      toast.error('Failed to create page')
    } finally {
      setCreating(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!session) {
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
            <h1 className="text-xl font-bold">Create New Page</h1>
          </div>
          <Button onClick={handleCreate} disabled={creating}>
            <Plus className="h-4 w-4 mr-2" />
            {creating ? 'Creating...' : 'Create Page'}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Page Details</CardTitle>
            <CardDescription>
              Enter the basic information for your new page
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Page Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g., About Us, Contact, Services"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug *</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">www.promptliai.co/</span>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  placeholder="about-us"
                />
              </div>
              <p className="text-xs text-gray-500">
                Auto-generated from title, but you can customize it
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="template">Page Template</Label>
              <Select
                value={formData.template}
                onValueChange={(value) =>
                  setFormData({ ...formData, template: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PAGE_TEMPLATES).map(([key, template]) => (
                    <SelectItem key={key} value={key}>
                      <div>
                        <div className="font-medium">{template.name}</div>
                        <div className="text-xs text-gray-500">
                          {template.description}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="published">Publish Immediately</Label>
                <p className="text-sm text-gray-500">
                  Make this page visible right away
                </p>
              </div>
              <Switch
                id="published"
                checked={formData.isPublished}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isPublished: checked })
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
