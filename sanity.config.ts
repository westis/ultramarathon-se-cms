// file path: sanity.config.ts
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {tags} from 'sanity-plugin-tags'

export default defineConfig({
  name: 'default',
  title: 'ultramarathon.se',
  projectId: 'w4mxvbu4',
  dataset: 'production',
  plugins: [structureTool(), visionTool(), tags({})],
  schema: {
    types: schemaTypes,
  },
})
