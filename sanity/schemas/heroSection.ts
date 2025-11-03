import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Main Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'primaryButtonText',
      title: 'Primary Button Text',
      type: 'string',
      initialValue: 'Book Free Consultation',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'secondaryButtonText',
      title: 'Secondary Button Text',
      type: 'string',
      initialValue: 'View Case Studies',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'badge1',
      title: 'Badge 1 Text',
      type: 'string',
      initialValue: 'No Setup Fees',
    }),
    defineField({
      name: 'badge2',
      title: 'Badge 2 Text',
      type: 'string',
      initialValue: '30-Day ROI Guarantee',
    }),
  ],
})
