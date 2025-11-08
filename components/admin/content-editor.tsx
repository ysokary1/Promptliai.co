'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

interface ContentEditorProps {
  section: 'hero' | 'services' | 'pricing' | 'settings'
}

export function ContentEditor({ section }: ContentEditorProps) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadData()
  }, [section])

  async function loadData() {
    setLoading(true)
    try {
      const response = await fetch(`/api/settings/${section}`)
      if (response.ok) {
        const result = await response.json()
        setData(result.data)
      }
    } catch (error) {
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    setSaving(true)
    try {
      const response = await fetch(`/api/settings/${section}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast.success('Changes saved successfully!')
      } else {
        toast.error('Failed to save changes')
      }
    } catch (error) {
      toast.error('Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  const updateField = (field: string, value: any) => {
    setData({ ...data, [field]: value })
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  if (!data) {
    return <div className="text-center py-8">No data found</div>
  }

  return (
    <div className="space-y-6">
      {section === 'hero' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="heading">Main Heading</Label>
            <Input
              id="heading"
              value={data.heading || ''}
              onChange={(e) => updateField('heading', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subheading">Subheading</Label>
            <Textarea
              id="subheading"
              value={data.subheading || ''}
              onChange={(e) => updateField('subheading', e.target.value)}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primaryBtn">Primary Button Text</Label>
              <Input
                id="primaryBtn"
                value={data.primaryButtonText || ''}
                onChange={(e) => updateField('primaryButtonText', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondaryBtn">Secondary Button Text</Label>
              <Input
                id="secondaryBtn"
                value={data.secondaryButtonText || ''}
                onChange={(e) => updateField('secondaryButtonText', e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="badge1">Badge 1</Label>
              <Input
                id="badge1"
                value={data.badge1 || ''}
                onChange={(e) => updateField('badge1', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="badge2">Badge 2</Label>
              <Input
                id="badge2"
                value={data.badge2 || ''}
                onChange={(e) => updateField('badge2', e.target.value)}
              />
            </div>
          </div>
        </>
      )}

      {section === 'settings' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="title">Site Title</Label>
            <Input
              id="title"
              value={data.title || ''}
              onChange={(e) => updateField('title', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Site Description</Label>
            <Textarea
              id="description"
              value={data.description || ''}
              onChange={(e) => updateField('description', e.target.value)}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={data.companyName || ''}
                onChange={(e) => updateField('companyName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={data.phone || ''}
                onChange={(e) => updateField('phone', e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.email || ''}
                onChange={(e) => updateField('email', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={data.address || ''}
                onChange={(e) => updateField('address', e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyDesc">Company Description</Label>
            <Textarea
              id="companyDesc"
              value={data.companyDescription || ''}
              onChange={(e) => updateField('companyDescription', e.target.value)}
              rows={3}
            />
          </div>
        </>
      )}

      {(section === 'services' || section === 'pricing') && (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Advanced editor for {section} coming soon. For now, use the JSON editor below:
          </p>
          <Textarea
            value={JSON.stringify(data, null, 2)}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value)
                setData(parsed)
              } catch (err) {
                // Invalid JSON, don't update
              }
            }}
            rows={15}
            className="font-mono text-sm"
          />
        </div>
      )}

      <div className="flex justify-end pt-4">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  )
}
