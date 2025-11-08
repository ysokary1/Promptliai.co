'use client'

import { useState, useEffect } from 'react'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ContentEditor } from './content-editor'
import { PagesManager } from './pages-manager'
import { toast } from 'sonner'

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('pages')
  const [isInitialized, setIsInitialized] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Check if database is initialized
    checkInitialization()
  }, [])

  async function checkInitialization() {
    try {
      const response = await fetch('/api/settings/hero')
      if (response.ok) {
        setIsInitialized(true)
      }
    } catch (error) {
      setIsInitialized(false)
    }
  }

  async function initializeDatabase() {
    setLoading(true)
    try {
      const response = await fetch('/api/init', { method: 'POST' })
      const data = await response.json()

      if (response.ok) {
        toast.success('Database initialized successfully!')
        setIsInitialized(true)
      } else {
        toast.error(data.error || 'Failed to initialize database')
      }
    } catch (error) {
      toast.error('Failed to initialize database')
    } finally {
      setLoading(false)
    }
  }

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Database Setup Required</CardTitle>
            <CardDescription>
              Initialize the database to start managing your content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={initializeDatabase} className="w-full" disabled={loading}>
              {loading ? 'Initializing...' : 'Initialize Database'}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="flex h-16 items-center justify-between px-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={() => signOut()}>
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-5 lg:w-[750px]">
            <TabsTrigger value="pages">Pages</TabsTrigger>
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="pages">
            <PagesManager />
          </TabsContent>

          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
                <CardDescription>
                  Edit the main hero section of your homepage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContentEditor section="hero" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>Services</CardTitle>
                <CardDescription>Manage your service offerings</CardDescription>
              </CardHeader>
              <CardContent>
                <ContentEditor section="services" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing">
            <Card>
              <CardHeader>
                <CardTitle>Pricing Plans</CardTitle>
                <CardDescription>Edit your pricing tiers</CardDescription>
              </CardHeader>
              <CardContent>
                <ContentEditor section="pricing" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Site Settings</CardTitle>
                <CardDescription>
                  Update site-wide settings like contact info and branding
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContentEditor section="settings" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
