import {defineType, defineField} from 'sanity'
import {ComposeIcon} from '@sanity/icons'

export const podcastEpisodeType = defineType({
  name: 'podcastEpisode',
  title: 'Podcast Episode',
  type: 'document',
  icon: ComposeIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Episode Title',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'array',
      of: [{type: 'block'}],
      title: 'Show Notes',
    }),
    defineField({
      name: 'audioUrl',
      type: 'url',
      title: 'Audio URL',
      description: 'URL of the audio file hosted on Libsyn',
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      title: 'Cover Art Square',
      description: 'Square cover art image for the podcast episode.',
    }),
    defineField({
      name: 'coverImageWide',
      type: 'image',
      title: 'Cover Art Widescreen',
      description: 'Widescreen cover art image for the podcast episode.',
    }),
    defineField({
      name: 'publicationDate',
      type: 'datetime',
      title: 'Publication Date',
    }),
    defineField({
      name: 'duration',
      type: 'string',
      title: 'Duration',
      description: 'Length of the podcast episode in HH:MM:SS format.',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'myTags',
      title: 'Tags',
      type: 'tags',
      options: {
        includeFromReference: 'tagType',
        allowCreate: true,
      },
    }),
    defineField({
      name: 'mainHost',
      title: 'Main Host',
      type: 'reference',
      to: [{type: 'person'}],
    }),
    defineField({
      name: 'coHost',
      title: 'Co-Host',
      type: 'reference',
      to: [{type: 'person'}],
    }),
    defineField({
      name: 'guests',
      title: 'Guests',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'person'}]}],
    }),
    defineField({
      name: 'transcript',
      title: 'Transcript',
      type: 'file',
      description: 'Transcript of the podcast episode in PDF format.',
    }),
  ],
  orderings: [
    {
      title: 'Publish Date, New',
      name: 'publishDateDesc',
      by: [{field: 'publicationDate', direction: 'desc'}],
    },
    {
      title: 'Publish Date, Old',
      name: 'publishDateAsc',
      by: [{field: 'publicationDate', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publicationDate',
      media: 'coverImage',
    },
    prepare({title, subtitle, media}) {
      return {
        title,
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : '',
        media,
      }
    },
  },
})
