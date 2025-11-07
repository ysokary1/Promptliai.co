'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function AdminPanel() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('site')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Site Settings
  const [siteSettings, setSiteSettings] = useState({
    title: '',
    description: '',
    phone: '',
    email: '',
    address: '',
    companyName: '',
    companyDescription: '',
    socialLinks: { linkedin: '', twitter: '', facebook: '' }
  })

  // Hero Section
  const [heroSection, setHeroSection] = useState({
    heading: '',
    subheading: '',
    primaryButtonText: '',
    secondaryButtonText: '',
    badge1: '',
    badge2: ''
  })

  // Services
  const [services, setServices] = useState<any[]>([])

  // Pricing Plans
  const [pricingPlans, setPricingPlans] = useState<any[]>([])

  // Check authentication
  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      loadAllContent()
    }
  }, [])

  const handleLogin = () => {
    // Simple password check - change 'admin123' to your password
    if (password === 'admin123') {
      setIsAuthenticated(true)
      sessionStorage.setItem('admin_auth', 'true')
      loadAllContent()
    } else {
      setMessage('Incorrect password')
    }
  }

  const loadAllContent = async () => {
    try {
      const res = await fetch('/api/content')
      const data = await res.json()
      setSiteSettings(data.siteSettings)
      setHeroSection(data.heroSection)
      setServices(data.services)
      setPricingPlans(data.pricingPlans)
    } catch (error) {
      setMessage('Error loading content')
    }
  }

  const saveSiteSettings = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/content/site-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(siteSettings)
      })
      if (res.ok) {
        setMessage('✅ Site settings saved!')
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (error) {
      setMessage('❌ Error saving')
    }
    setLoading(false)
  }

  const saveHeroSection = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/content/hero-section', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(heroSection)
      })
      if (res.ok) {
        setMessage('✅ Hero section saved!')
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (error) {
      setMessage('❌ Error saving')
    }
    setLoading(false)
  }

  const saveServices = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/content/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(services)
      })
      if (res.ok) {
        setMessage('✅ Services saved!')
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (error) {
      setMessage('❌ Error saving')
    }
    setLoading(false)
  }

  const savePricingPlans = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/content/pricing-plans', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pricingPlans)
      })
      if (res.ok) {
        setMessage('✅ Pricing plans saved!')
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (error) {
      setMessage('❌ Error saving')
    }
    setLoading(false)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8">
          <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
          <div className="space-y-4">
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Enter admin password"
              />
            </div>
            <Button onClick={handleLogin} className="w-full">Login</Button>
            {message && <p className="text-red-500 text-sm">{message}</p>}
          </div>
          <p className="text-sm text-gray-500 mt-4">Default password: admin123</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Content Manager</h1>
            <p className="text-purple-100">Edit your website content visually</p>
          </div>
          <Button
            variant="secondary"
            onClick={() => {
              sessionStorage.removeItem('admin_auth')
              setIsAuthenticated(false)
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      {message && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 max-w-7xl mx-auto mt-4">
          <p className="text-green-700 font-medium">{message}</p>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex gap-2 mb-6 flex-wrap">
          {['site', 'hero', 'services', 'pricing'].map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab)}
              className="capitalize"
            >
              {tab === 'site' ? 'Site Settings' : tab === 'hero' ? 'Hero Section' : tab}
            </Button>
          ))}
        </div>

        {activeTab === 'site' && (
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Site Settings</h2>
            <div className="space-y-4">
              <div>
                <Label>Site Title</Label>
                <Input
                  value={siteSettings.title}
                  onChange={(e) => setSiteSettings({...siteSettings, title: e.target.value})}
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={siteSettings.description}
                  onChange={(e) => setSiteSettings({...siteSettings, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Phone</Label>
                  <Input
                    value={siteSettings.phone}
                    onChange={(e) => setSiteSettings({...siteSettings, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    value={siteSettings.email}
                    onChange={(e) => setSiteSettings({...siteSettings, email: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label>Company Name</Label>
                <Input
                  value={siteSettings.companyName}
                  onChange={(e) => setSiteSettings({...siteSettings, companyName: e.target.value})}
                />
              </div>
              <div>
                <Label>Company Description</Label>
                <Textarea
                  value={siteSettings.companyDescription}
                  onChange={(e) => setSiteSettings({...siteSettings, companyDescription: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>LinkedIn URL</Label>
                  <Input
                    value={siteSettings.socialLinks.linkedin}
                    onChange={(e) => setSiteSettings({
                      ...siteSettings,
                      socialLinks: {...siteSettings.socialLinks, linkedin: e.target.value}
                    })}
                  />
                </div>
                <div>
                  <Label>Twitter URL</Label>
                  <Input
                    value={siteSettings.socialLinks.twitter}
                    onChange={(e) => setSiteSettings({
                      ...siteSettings,
                      socialLinks: {...siteSettings.socialLinks, twitter: e.target.value}
                    })}
                  />
                </div>
                <div>
                  <Label>Facebook URL</Label>
                  <Input
                    value={siteSettings.socialLinks.facebook}
                    onChange={(e) => setSiteSettings({
                      ...siteSettings,
                      socialLinks: {...siteSettings.socialLinks, facebook: e.target.value}
                    })}
                  />
                </div>
              </div>
              <Button onClick={saveSiteSettings} disabled={loading} className="w-full">
                {loading ? 'Saving...' : 'Save Site Settings'}
              </Button>
            </div>
          </Card>
        )}

        {activeTab === 'hero' && (
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Hero Section</h2>
            <div className="space-y-4">
              <div>
                <Label>Main Heading</Label>
                <Input
                  value={heroSection.heading}
                  onChange={(e) => setHeroSection({...heroSection, heading: e.target.value})}
                />
              </div>
              <div>
                <Label>Subheading</Label>
                <Textarea
                  value={heroSection.subheading}
                  onChange={(e) => setHeroSection({...heroSection, subheading: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Primary Button Text</Label>
                  <Input
                    value={heroSection.primaryButtonText}
                    onChange={(e) => setHeroSection({...heroSection, primaryButtonText: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Secondary Button Text</Label>
                  <Input
                    value={heroSection.secondaryButtonText}
                    onChange={(e) => setHeroSection({...heroSection, secondaryButtonText: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Badge 1</Label>
                  <Input
                    value={heroSection.badge1}
                    onChange={(e) => setHeroSection({...heroSection, badge1: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Badge 2</Label>
                  <Input
                    value={heroSection.badge2}
                    onChange={(e) => setHeroSection({...heroSection, badge2: e.target.value})}
                  />
                </div>
              </div>
              <Button onClick={saveHeroSection} disabled={loading} className="w-full">
                {loading ? 'Saving...' : 'Save Hero Section'}
              </Button>
            </div>
          </Card>
        )}

        {activeTab === 'services' && (
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Services</h2>
            <div className="space-y-6">
              {services.map((service, index) => (
                <Card key={service.id} className="p-4 border-2">
                  <div className="space-y-4">
                    <div>
                      <Label>Service Name</Label>
                      <Input
                        value={service.name}
                        onChange={(e) => {
                          const newServices = [...services]
                          newServices[index].name = e.target.value
                          setServices(newServices)
                        }}
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={service.description}
                        onChange={(e) => {
                          const newServices = [...services]
                          newServices[index].description = e.target.value
                          setServices(newServices)
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Icon</Label>
                        <select
                          className="w-full border rounded p-2"
                          value={service.icon}
                          onChange={(e) => {
                            const newServices = [...services]
                            newServices[index].icon = e.target.value
                            setServices(newServices)
                          }}
                        >
                          <option value="bot">Bot</option>
                          <option value="workflow">Workflow</option>
                          <option value="cog">Cog</option>
                          <option value="brain">Brain</option>
                          <option value="code">Code</option>
                        </select>
                      </div>
                      <div>
                        <Label>Order</Label>
                        <Input
                          type="number"
                          value={service.displayOrder}
                          onChange={(e) => {
                            const newServices = [...services]
                            newServices[index].displayOrder = parseInt(e.target.value)
                            setServices(newServices)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              <Button onClick={saveServices} disabled={loading} className="w-full">
                {loading ? 'Saving...' : 'Save All Services'}
              </Button>
            </div>
          </Card>
        )}

        {activeTab === 'pricing' && (
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Pricing Plans</h2>
            <div className="space-y-6">
              {pricingPlans.map((plan, index) => (
                <Card key={plan.id} className="p-4 border-2">
                  <div className="space-y-4">
                    <div>
                      <Label>Plan Name</Label>
                      <Input
                        value={plan.name}
                        onChange={(e) => {
                          const newPlans = [...pricingPlans]
                          newPlans[index].name = e.target.value
                          setPricingPlans(newPlans)
                        }}
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={plan.description}
                        onChange={(e) => {
                          const newPlans = [...pricingPlans]
                          newPlans[index].description = e.target.value
                          setPricingPlans(newPlans)
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Monthly Price ($)</Label>
                        <Input
                          type="number"
                          value={plan.monthlyPrice}
                          onChange={(e) => {
                            const newPlans = [...pricingPlans]
                            newPlans[index].monthlyPrice = parseFloat(e.target.value)
                            setPricingPlans(newPlans)
                          }}
                        />
                      </div>
                      <div>
                        <Label>Yearly Price ($)</Label>
                        <Input
                          type="number"
                          value={plan.yearlyPrice}
                          onChange={(e) => {
                            const newPlans = [...pricingPlans]
                            newPlans[index].yearlyPrice = parseFloat(e.target.value)
                            setPricingPlans(newPlans)
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Features (one per line)</Label>
                      <Textarea
                        value={plan.features.join('\n')}
                        onChange={(e) => {
                          const newPlans = [...pricingPlans]
                          newPlans[index].features = e.target.value.split('\n').filter(f => f.trim())
                          setPricingPlans(newPlans)
                        }}
                        rows={6}
                      />
                    </div>
                  </div>
                </Card>
              ))}
              <Button onClick={savePricingPlans} disabled={loading} className="w-full">
                {loading ? 'Saving...' : 'Save All Pricing Plans'}
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
