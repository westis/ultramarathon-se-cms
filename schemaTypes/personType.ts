// File path: /schemaTypes/personType.ts

import {defineField, defineType} from 'sanity'

export const personType = defineType({
  name: 'person',
  type: 'document',
  title: 'Person',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
    // Add additional fields for a person (profile image, bio, etc.) if needed
  ],
})
