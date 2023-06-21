import { makeSource } from 'contentlayer/source-files'

import mdx from './config/contentlayer/mdx'
import Post from './config/contentlayer/post'
import Project from './config/contentlayer/project'
import Snippet from './config/contentlayer/snippet'

const contentLayerConfig = makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Project, Snippet],
  mdx,
})

export default contentLayerConfig
