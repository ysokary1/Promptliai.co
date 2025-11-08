'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'

export default function SetupPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function initializeDatabase() {
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/init', {
        method: 'POST',
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(`Database initialized successfully! Admin email: ${data.adminEmail}`)
      } else {
        setStatus('error')
        setMessage(data.error || 'Failed to initialize database')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Network error. Please check your connection and try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Database Setup
          </CardTitle>
          <CardDescription className="text-center">
            Initialize your Promptli AI database
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === 'idle' && (
            <>
              <p className="text-sm text-gray-600">
                Click the button below to create database tables and set up your admin account.
              </p>
              <Button onClick={initializeDatabase} className="w-full">
                Initialize Database
              </Button>
            </>
          )}

          {status === 'loading' && (
            <div className="text-center py-8">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-500" />
              <p className="mt-4 text-sm text-gray-600">
                Setting up database...
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-4">
              <div className="flex items-center justify-center text-green-600">
                <CheckCircle className="h-12 w-12" />
              </div>
              <div className="text-center space-y-2">
                <p className="font-semibold text-green-700">Success!</p>
                <p className="text-sm text-gray-600">{message}</p>
              </div>
              <div className="pt-4 space-y-2">
                <Button
                  onClick={() => (window.location.href = '/admin/login')}
                  className="w-full"
                >
                  Go to Admin Login
                </Button>
                <Button
                  onClick={() => (window.location.href = '/')}
                  variant="outline"
                  className="w-full"
                >
                  Go to Homepage
                </Button>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <div className="flex items-center justify-center text-red-600">
                <XCircle className="h-12 w-12" />
              </div>
              <div className="text-center space-y-2">
                <p className="font-semibold text-red-700">Error</p>
                <p className="text-sm text-gray-600">{message}</p>
              </div>
              <Button
                onClick={() => setStatus('idle')}
                variant="outline"
                className="w-full"
              >
                Try Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
