import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', title: 'Title'}),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Body',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [{title: 'Bullet', value: 'bullet'}],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'URL',
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
          fields: [
            {
              name: 'alt',
              type: 'text',
              title: 'Alternative text',
              description: 'Important for accessibility and SEO.',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'categories',
      type: 'array',
      title: 'Categories',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({name: 'publishDate', type: 'datetime', title: 'Publish Date'}),
  ],
})
