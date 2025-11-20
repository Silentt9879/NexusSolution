// schemaTypes/teamMember.js
// Updated to support translated team member roles

export default {
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role (Translated)',
      description: 'Add role translations in both English and Malay',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'ms',
          title: 'Malay (Bahasa Malaysia)',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true, // Lets you crop images better
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'orderRank',
      title: 'Order Rank',
      type: 'number',
      description: 'Used to sort team members in the display (lower numbers appear first)',
      validation: (Rule) => Rule.required().min(0),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role.en',
      media: 'image',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title,
        subtitle: subtitle || 'No role defined',
        media,
      };
    },
  },
}