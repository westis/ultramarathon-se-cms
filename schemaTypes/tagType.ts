// File path: /schemaTypes/tagType.ts

import {defineField, defineType} from 'sanity'

export const tagType = defineType({
  name: 'tagType',
  title: 'Tag',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'slug',
      options: {
        source: 'label',
      },
    }),
  ],
})
