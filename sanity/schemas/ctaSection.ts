import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'ctaSection',
  title: 'CTA Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Main Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Ready to Transform Your Business?',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
      initialValue: 'Join hundreds of companies already using AI to scale their operations',
    }),
    defineField({
      name: 'primaryButtonText',
      title: 'Primary Button Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Get Started Today',
    }),
    defineField({
      name: 'primaryButtonLink',
      title: 'Primary Button Link',
      type: 'string',
      initialValue: '#pricing',
    }),
    defineField({
      name: 'secondaryButtonText',
      title: 'Secondary Button Text',
      type: 'string',
      initialValue: 'Schedule a Demo',
    }),
    defineField({
      name: 'secondaryButtonLink',
      title: 'Secondary Button Link',
      type: 'string',
      initialValue: '#contact',
    }),
    defineField({
      name: 'backgroundStyle',
      title: 'Background Style',
      type: 'string',
      options: {
        list: [
          { title: 'Gradient', value: 'gradient' },
          { title: 'Solid', value: 'solid' },
          { title: 'Pattern', value: 'pattern' },
        ],
      },
      initialValue: 'gradient',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
  },
})
