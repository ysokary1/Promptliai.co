import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'problemSolutionSection',
  title: 'Problem & Solution Section',
  type: 'document',
  fields: [
    defineField({
      name: 'problemTitle',
      title: 'Problem Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Still Managing Everything Manually?',
    }),
    defineField({
      name: 'problems',
      title: 'Problems',
      type: 'array',
      of: [{ type: 'text' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'solutionTitle',
      title: 'Solution Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'We Build AI Solutions That Work',
    }),
    defineField({
      name: 'solutions',
      title: 'Solutions',
      type: 'array',
      of: [{ type: 'text' }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'problemTitle',
      subtitle: 'solutionTitle',
    },
  },
})
