import {createClient} from '@sanity/client'
const client = createClient({
  projectId: 'w4mxvbu4',
  dataset: 'production', // Replace with your actual dataset name
  token:
    'skPzllr9w7M9Rsu4j3wTwBItW4XDfsNpr69Uzm6qk5aSzZKXerqyB8CjwVs6XfhnL7PDcNPKhcalmN6GIIwdBXXTFpMjT85dETSBsG2VsmCEFkR5zgQQgATguwoa3w2TzSiPNbilgjjvJEU6HNKv207CpMXfV7nyQCNzNaVKgUTTCrEHT9hR', // Your Sanity token with delete permissions
  useCdn: false,
  apiVersion: '2021-03-25', // Use the current date to ensure you're using the latest API version
})

async function deleteAllPodcastEpisodes() {
  const query = '*[_type == "podcastEpisode"]._id'
  const episodeIds = await client.fetch(query)

  if (episodeIds.length === 0) {
    console.log('No episodes found to delete.')
    return
  }

  const transaction = client.transaction()
  episodeIds.forEach((id) => {
    if (id) {
      transaction.delete(id)
      console.log(`Scheduled deletion for episode ID: ${id}`)
    }
  })

  await transaction.commit()
  console.log('All scheduled deletions have been committed.')
}

deleteAllPodcastEpisodes().catch((err) => {
  console.error('Failed to delete episodes:', err.message)
})
