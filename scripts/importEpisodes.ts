/* 
file path: components/importEpisodes.ts
run: node --loader ts-node/esm scripts/importEpisodes.ts
 */

import {createClient} from '@sanity/client'
import RSSParser from 'rss-parser'
import dotenv from 'dotenv'
import {v4 as uuidv4} from 'uuid'
import slugify from 'slugify'

dotenv.config()

const client = createClient({
  projectId: 'w4mxvbu4',
  dataset: 'production',
  apiVersion: '2024-03-20',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const rssParser = new RSSParser()

async function uploadImageToSanity(imageUrl: string) {
  const response = await fetch(imageUrl)
  if (!response.ok) {
    throw new Error(`Failed to fetch image from URL: ${imageUrl}`)
  }
  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const filename = new URL(imageUrl).pathname.split('/').pop() || 'fallbackFilename.jpg'
  const asset = await client.assets.upload('image', buffer, {
    filename,
  })
  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
  }
}

// A helper function to transform HTML to Portable Text
function htmlToPortableText(html: string) {
  return html
    .split(/<\/p>/gi)
    .filter(Boolean)
    .map((paragraph: string) => ({
      _type: 'block',
      _key: uuidv4(),
      children: [
        {
          _type: 'span',
          _key: uuidv4(),
          text: paragraph.replace(/<[^>]+>/g, '').trim(), // Strips HTML tags
          marks: [],
        },
      ],
      markDefs: [],
      style: 'normal',
    }))
}

const importEpisodes = async () => {
  try {
    const feed = await rssParser.parseURL('https://feeds.libsyn.com/253223/rss')
    const episodes = await Promise.all(
      feed.items.slice(0, 5).map(async (item) => {
        let coverImage

        if (item.itunes.image) {
          coverImage = await uploadImageToSanity(item.itunes.image)
        }

        const description =
          item.content ||
          item.contentEncoded ||
          item.contentSnippet ||
          '<p>No description available</p>'
        const portableTextDescription = htmlToPortableText(description)

        return {
          _type: 'podcastEpisode',
          title: item.title || 'Untitled',
          slug: {
            _type: 'slug',
            current: slugify(item.title || 'untitled', {
              lower: true,
              strict: true,
              locale: 'sv',
            }).slice(0, 200),
          },
          description: portableTextDescription,
          audioUrl: item.enclosure?.url,
          publicationDate: new Date(item.pubDate || Date.now()).toISOString(),
          tags: item.itunes.keywords
            ? item.itunes.keywords.split(',').map((keyword: string) => keyword.trim())
            : [],
          coverImage,
          duration: item.itunes.duration,
        }
      }),
    )

    for (const episode of episodes) {
      const episodeWithId = {...episode, _id: uuidv4()} // Add _id property to the episode object
      await client.createIfNotExists(episodeWithId) // Use createIfNotExists to avoid duplicate entries
      console.log(`Successfully imported episode: ${episode.title}`)
    }
  } catch (error) {
    console.error('Failed to import episodes:', error)
  }
}

importEpisodes()
