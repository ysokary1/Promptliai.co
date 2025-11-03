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
            S.listItem()
              .title('Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.listItem()
              .title('Hero Section')
              .child(
                S.document()
                  .schemaType('heroSection')
                  .documentId('heroSection')
              ),
            S.divider(),
            S.documentTypeListItem('service').title('Services'),
            S.documentTypeListItem('pricingPlan').title('Pricing Plans'),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  schema: {
    types: schemaTypes,
  },
})
