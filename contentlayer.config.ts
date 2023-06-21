import { makeSource } from 'contentlayer/source-files'

import mdx from './config/mdx'
import Post from './config/post'
import Project from './config/project'
import Snippet from './config/snippet'

const contentLayerConfig = makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Project, Snippet],
  mdx,
})

export default contentLayerConfig
