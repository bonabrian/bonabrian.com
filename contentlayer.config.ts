import { makeSource } from 'contentlayer/source-files'

import mdx from './config/contentlayer/mdx'
import Note from './config/contentlayer/note'
import Post from './config/contentlayer/post'
import Project from './config/contentlayer/project'
import TIL from './config/contentlayer/til'

const contentLayerConfig = makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Project, Note, TIL],
  mdx,
})

export default contentLayerConfig
