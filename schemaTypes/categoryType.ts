// File path: /schemaTypes/categoryType.ts

import {defineField, defineType} from 'sanity'

export const categoryType = defineType({
  name: 'category',
  type: 'document',
  title: 'Category',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'options',
      type: 'array',
      title: 'Options',
      of: [{type: 'string'}], // An array of simple string values
    }),
  ],
})
