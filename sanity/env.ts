// Sanity configuration - fallbacks allow the app to build without Sanity configured
// To use Sanity CMS, add these to your .env.local file:
// NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
// NEXT_PUBLIC_SANITY_DATASET=production
// NEXT_PUBLIC_SANITY_API_VERSION=2024-11-03

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-11-03'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''

export const useCdn = false

// Check if Sanity is properly configured
export const isSanityConfigured = !!projectId
