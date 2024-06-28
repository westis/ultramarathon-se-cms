import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'navigationItem',
  title: 'Navigation Item',
  type: 'object',
  fields: [
    defineField({name: 'title', type: 'string', title: 'Title'}),
    defineField({name: 'slug', type: 'string', title: 'Slug'}),
    defineField({
      name: 'children',
      type: 'array',
      title: 'Children',
      of: [{type: 'navigationItem'}],
    }),
  ],
})
