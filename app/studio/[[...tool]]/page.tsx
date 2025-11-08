'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'
import { useEffect, useState } from 'react'

export default function StudioPage() {
  const [isConfigValid, setIsConfigValid] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Validate Sanity configuration
    try {
      if (!config?.projectId || config.projectId === '') {
        setError('Missing Sanity Project ID. Please set NEXT_PUBLIC_SANITY_PROJECT_ID in your environment variables.')
        return
      }
      if (!config?.dataset) {
        setError('Missing Sanity Dataset. Please set NEXT_PUBLIC_SANITY_DATASET in your environment variables.')
        return
      }
      setIsConfigValid(true)
    } catch (err) {
      setError('Invalid Sanity configuration. Please check your environment variables.')
    }
  }, [])

  if (error) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div style={{
          maxWidth: '600px',
          padding: '2rem',
          border: '1px solid #e53e3e',
          borderRadius: '8px',
          backgroundColor: '#fff5f5'
        }}>
          <h1 style={{ color: '#c53030', marginBottom: '1rem', fontSize: '1.5rem' }}>
            Configuration Error
          </h1>
          <p style={{ color: '#742a2a', marginBottom: '1rem' }}>
            {error}
          </p>
          <div style={{
            padding: '1rem',
            backgroundColor: '#f7fafc',
            borderRadius: '4px',
            fontSize: '0.875rem',
            color: '#2d3748'
          }}>
            <p style={{ marginBottom: '0.5rem' }}><strong>Required environment variables:</strong></p>
            <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
              <li>NEXT_PUBLIC_SANITY_PROJECT_ID</li>
              <li>NEXT_PUBLIC_SANITY_DATASET</li>
              <li>NEXT_PUBLIC_SANITY_API_VERSION (optional, defaults to 2024-11-03)</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  if (!isConfigValid) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
      }}>
        <div style={{ textAlign: 'center' }}>
          <p>Loading Sanity Studio...</p>
        </div>
      </div>
    )
  }

  return <NextStudio config={config} />
}
