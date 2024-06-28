import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', title: 'Title'}),
    defineField({
      name: 'items',
      type: 'array',
      title: 'Items',
      of: [{type: 'navigationItem'}],
    }),
  ],
})
