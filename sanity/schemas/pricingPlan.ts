import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pricingPlan',
  title: 'Pricing Plan',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Plan Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'monthlyPrice',
      title: 'Monthly Price',
      type: 'number',
      description: 'Price per month in dollars (without $ symbol)',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'yearlyPrice',
      title: 'Yearly Price',
      type: 'number',
      description: 'Price per month when billed annually (without $ symbol)',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'period',
      title: 'Billing Period',
      type: 'string',
      description: 'e.g., "month", "year"',
      initialValue: 'month',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      initialValue: 'Get Started',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isPopular',
      title: 'Mark as Popular',
      type: 'boolean',
      description: 'Highlight this plan as the most popular choice',
      initialValue: false,
    }),
    defineField({
      name: 'isComingSoon',
      title: 'Coming Soon',
      type: 'boolean',
      description: 'Mark this plan as coming soon (will be blurred)',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this plan appears (lower numbers first)',
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
