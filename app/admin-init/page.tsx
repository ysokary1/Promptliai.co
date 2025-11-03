'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminInitPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const initializeData = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/init-sanity', {
        method: 'POST',
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to initialize data')
        if (data.instructions) {
          setError(data.error + '\n\n' + data.instructions)
        }
      } else {
        setResult(data)
      }
    } catch (err: any) {
      setError('Network error: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Sanity CMS Initialization</CardTitle>
          <CardDescription>
            Populate your Sanity database with all current website content in one click
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">What will be added:</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
              <li>Site Settings (title, phone, email, address, social links)</li>
              <li>Hero Section (heading, subheading, button texts, badges)</li>
              <li>3 Services (AI Chatbots, AI Integration, Smart Analytics)</li>
              <li>3 Pricing Plans (Starter, Professional, Enterprise)</li>
            </ul>
          </div>

          <div className="border-t pt-4">
            <Button
              onClick={initializeData}
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? 'Initializing...' : 'Initialize Sanity Content'}
            </Button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2">Error</h4>
              <p className="text-red-700 text-sm whitespace-pre-wrap">{error}</p>

              {error.includes('API token') && (
                <div className="mt-4 p-3 bg-white rounded border border-red-200">
                  <p className="text-sm font-semibold mb-2">Quick Fix:</p>
                  <ol className="list-decimal list-inside text-sm space-y-1">
                    <li>Go to Vercel dashboard → Your project → Settings → Environment Variables</li>
                    <li>Add: <code className="bg-gray-100 px-1 rounded">SANITY_API_TOKEN</code></li>
                    <li>Value: Your Sanity API token (from sanity.io/manage/personal/tokens)</li>
                    <li>Make sure it has "Editor" permissions</li>
                    <li>Redeploy your site</li>
                  </ol>
                </div>
              )}
            </div>
          )}

          {result && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">✅ Success!</h4>
              <p className="text-green-700 text-sm mb-3">{result.message}</p>

              <div className="space-y-2">
                <p className="text-sm font-semibold">Created documents:</p>
                <ul className="text-sm space-y-1">
                  {result.results?.map((r: any, i: number) => (
                    <li key={i} className={r.success ? 'text-green-700' : 'text-red-700'}>
                      {r.success ? '✓' : '✗'} {r.type || r.doc}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 p-3 bg-white rounded border border-green-200">
                <p className="text-sm font-semibold mb-2">Next Steps:</p>
                <ol className="list-decimal list-inside text-sm space-y-1">
                  <li>Go to <a href="/studio" className="text-blue-600 hover:underline">/studio</a></li>
                  <li>Click on "Site Settings", "Hero Section", "Services", or "Pricing Plans"</li>
                  <li>Edit any content you want</li>
                  <li>Click "Publish"</li>
                  <li>Your changes will appear on the site in ~3 seconds!</li>
                </ol>
              </div>
            </div>
          )}

          <div className="text-sm text-gray-500 border-t pt-4">
            <p className="font-semibold mb-2">Note:</p>
            <ul className="space-y-1 text-xs">
              <li>• This is safe to run multiple times (it updates existing data)</li>
              <li>• Any custom changes you made in Studio will be overwritten</li>
              <li>• You can delete this page after initialization</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
