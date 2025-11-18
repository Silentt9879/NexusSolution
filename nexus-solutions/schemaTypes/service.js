// sanity-studio/schemas/service.js (or wherever your schema is)
export default {
  name: 'service',
  type: 'document',
  title: 'Service',
  fields: [
    // ENGLISH FIELDS (existing)
    {
      name: 'title',
      type: 'string',
      title: 'Title (English)',
      description: 'Service title in English',
      validation: Rule => Rule.required()
    },
    {
      name: 'shortDescription',
      type: 'text',
      title: 'Short Description (English)',
      description: 'Brief description shown on services page',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      type: 'text',
      title: 'Detailed Description (English)',
      description: 'Full description for service detail page'
    },
    
    // MALAY FIELDS (ADD THESE!)
    {
      name: 'title_ms',
      type: 'string',
      title: '📝 Title (Malay / Bahasa Malaysia)',
      description: 'Tajuk perkhidmatan dalam Bahasa Malaysia',
      validation: Rule => Rule.required()
    },
    {
      name: 'shortDescription_ms',
      type: 'text',
      title: '📝 Short Description (Malay / Bahasa Malaysia)',
      description: 'Penerangan ringkas dalam Bahasa Malaysia',
      validation: Rule => Rule.required()
    },
    {
      name: 'description_ms',
      type: 'text',
      title: '📝 Detailed Description (Malay / Bahasa Malaysia)',
      description: 'Penerangan penuh dalam Bahasa Malaysia'
    },
    
    // OTHER FIELDS (existing)
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 200,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'orderRank',
      type: 'number',
      title: 'Order Rank',
      description: 'Determines the order of services (lower numbers appear first)'
    }
  ],
  
  // Preview configuration
  preview: {
    select: {
      title: 'title',
      subtitle: 'shortDescription'
    }
  }
}