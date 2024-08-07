import { makeSource } from 'contentlayer/source-files'

import mdx from './scripts/contentlayer/mdx'
import Note from './scripts/contentlayer/note'
import Post from './scripts/contentlayer/post'
import Project from './scripts/contentlayer/project'
import TIL from './scripts/contentlayer/til'

const contentLayerConfig = makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Project, Note, TIL],
  mdx,
})

export default contentLayerConfig
