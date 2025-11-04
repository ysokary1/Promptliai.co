import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL path for this page (e.g., "about" for /about). Use "home" for the homepage.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metaTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Optional custom title for search engines',
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      description: 'Description for search engines (max 160 characters)',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      description: 'Add, remove, and reorder sections to build your page',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'heroSection' },
            { type: 'statsSection' },
            { type: 'processSection' },
            { type: 'ctaSection' },
          ],
          options: {
            filter: '_type in ["heroSection", "statsSection", "processSection", "ctaSection"]',
          },
        },
        {
          type: 'object',
          name: 'servicesSection',
          title: 'Services Section',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
              initialValue: 'Our Services',
            }),
            defineField({
              name: 'subtitle',
              title: 'Section Subtitle',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'layout',
              title: 'Layout Style',
              type: 'string',
              options: {
                list: [
                  { title: 'Grid', value: 'grid' },
                  { title: 'Bento', value: 'bento' },
                  { title: 'Cards', value: 'cards' },
                ],
              },
              initialValue: 'bento',
            }),
          ],
          preview: {
            prepare() {
              return {
                title: 'Services Section',
                subtitle: 'Displays all services from Services collection',
              }
            },
          },
        },
        {
          type: 'object',
          name: 'pricingSection',
          title: 'Pricing Section',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
              initialValue: 'Simple, Transparent Pricing',
            }),
            defineField({
              name: 'subtitle',
              title: 'Section Subtitle',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'showToggle',
              title: 'Show Monthly/Yearly Toggle',
              type: 'boolean',
              initialValue: true,
            }),
          ],
          preview: {
            prepare() {
              return {
                title: 'Pricing Section',
                subtitle: 'Displays all pricing plans from Pricing Plans collection',
              }
            },
          },
        },
        {
          type: 'object',
          name: 'customContent',
          title: 'Custom Content Block',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'H1', value: 'h1' },
                    { title: 'H2', value: 'h2' },
                    { title: 'H3', value: 'h3' },
                    { title: 'H4', value: 'h4' },
                    { title: 'Quote', value: 'blockquote' },
                  ],
                  lists: [
                    { title: 'Bullet', value: 'bullet' },
                    { title: 'Numbered', value: 'number' },
                  ],
                  marks: {
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' },
                      { title: 'Code', value: 'code' },
                    ],
                    annotations: [
                      {
                        title: 'URL',
                        name: 'link',
                        type: 'object',
                        fields: [
                          {
                            title: 'URL',
                            name: 'href',
                            type: 'url',
                          },
                        ],
                      },
                    ],
                  },
                },
                {
                  type: 'image',
                  options: { hotspot: true },
                },
              ],
            }),
            defineField({
              name: 'alignment',
              title: 'Content Alignment',
              type: 'string',
              options: {
                list: [
                  { title: 'Left', value: 'left' },
                  { title: 'Center', value: 'center' },
                  { title: 'Right', value: 'right' },
                ],
              },
              initialValue: 'left',
            }),
          ],
          preview: {
            select: {
              title: 'title',
            },
            prepare({ title }) {
              return {
                title: title || 'Custom Content Block',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      description: 'Set to true to make this page visible on the website',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      isPublished: 'isPublished',
    },
    prepare({ title, slug, isPublished }) {
      return {
        title,
        subtitle: `/${slug}${isPublished ? ' ✓' : ' (Draft)'}`,
      }
    },
  },
})
