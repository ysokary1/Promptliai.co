import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import { apiVersion, dataset, projectId } from './sanity/env'

export default defineConfig({
  name: 'default',
  title: 'Promptli AI CMS',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Global Settings
            S.listItem()
              .title('Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),

            // Page Builder
            S.documentTypeListItem('page').title('Pages'),
            S.divider(),

            // Content Sections
            S.listItem()
              .title('Hero Section')
              .child(
                S.document()
                  .schemaType('heroSection')
                  .documentId('heroSection')
              ),
            S.listItem()
              .title('Problem & Solution Section')
              .child(
                S.document()
                  .schemaType('problemSolutionSection')
                  .documentId('problemSolutionSection')
              ),
            S.listItem()
              .title('Process Section')
              .child(
                S.document()
                  .schemaType('processSection')
                  .documentId('processSection')
              ),
            S.listItem()
              .title('Stats Section')
              .child(
                S.document()
                  .schemaType('statsSection')
                  .documentId('statsSection')
              ),
            S.listItem()
              .title('Testimonials Section')
              .child(
                S.document()
                  .schemaType('testimonialsSection')
                  .documentId('testimonialsSection')
              ),
            S.listItem()
              .title('CTA Section')
              .child(
                S.document()
                  .schemaType('ctaSection')
                  .documentId('ctaSection')
              ),
            S.divider(),

            // Collections
            S.documentTypeListItem('service').title('Services'),
            S.documentTypeListItem('pricingPlan').title('Pricing Plans'),
            S.divider(),

            // Legal Pages
            S.documentTypeListItem('legalPage').title('Legal Pages'),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  schema: {
    types: schemaTypes,
  },
})
