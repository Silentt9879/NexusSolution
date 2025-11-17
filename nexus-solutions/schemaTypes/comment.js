// nexus-solutions/schemaTypes/comment.js

export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      description: "Comments won't show on the site without approval.",
      initialValue: false,
    },
    {
      name: 'comment',
      title: 'Comment',
      type: 'text',
    },
    {
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{ type: 'post' }], // This is the magic line
    },
  ],
  preview: {
    select: {
      name: 'name',
      comment: 'comment',
      post: 'post.title',
    },
    prepare({ name, comment, post }) {
      return {
        title: `${name} on ${post}`,
        subtitle: comment,
      };
    },
  },
}