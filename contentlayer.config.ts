import { makeSource } from 'contentlayer/source-files'

import mdx from './config/contentlayer/mdx'
import Post from './config/contentlayer/post'
import Project from './config/contentlayer/project'
import Snippet from './config/contentlayer/snippet'
import TIL from './config/contentlayer/til'

const contentLayerConfig = makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Project, Snippet, TIL],
  mdx,
})

export default contentLayerConfig
