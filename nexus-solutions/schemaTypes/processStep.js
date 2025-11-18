// schemaTypes/processStep.js
export default {
  name: 'processStep',
  type: 'document',
  title: 'Process Step',
  fields: [
    {
      name: 'stepNumber',
      type: 'number',
      title: 'Step Number',
      description: 'The order of this step (1, 2, 3, etc.)',
      validation: Rule => Rule.required().min(1).integer()
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title (English)',
      description: 'Step title in English',
      validation: Rule => Rule.required()
    },
    {
      name: 'title_ms',
      type: 'string',
      title: 'Title (Malay / Bahasa Malaysia)',
      description: 'Tajuk langkah dalam Bahasa Malaysia',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description (English)',
      description: 'Step description in English',
      validation: Rule => Rule.required()
    },
    {
      name: 'description_ms',
      type: 'text',
      title: 'Description (Malay / Bahasa Malaysia)',
      description: 'Penerangan langkah dalam Bahasa Malaysia',
      validation: Rule => Rule.required()
    },
    {
      name: 'service',
      type: 'reference',
      title: 'Service',
      to: [{ type: 'service' }],
      description: 'Which service does this step belong to?',
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'title',
      stepNumber: 'stepNumber',
      serviceName: 'service.title'
    },
    prepare({ title, stepNumber, serviceName }) {
      return {
        title: `${stepNumber}. ${title}`,
        subtitle: `Service: ${serviceName || 'Not assigned'}`
      }
    }
  },
  orderings: [
    {
      title: 'Step Number',
      name: 'stepNumberAsc',
      by: [{ field: 'stepNumber', direction: 'asc' }]
    }
  ]
}