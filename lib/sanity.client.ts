import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, useCdn } from '@/sanity/env'

// Create a mock client for when Sanity is not configured
const createMockClient = () => ({
  fetch: async () => null,
  create: async () => ({}),
  createOrReplace: async () => ({}),
  delete: async () => ({}),
  patch: () => ({
    set: () => ({}),
    commit: async () => ({}),
  }),
})

// Only create a real Sanity client if projectId is configured
export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
    })
  : (createMockClient() as any)
