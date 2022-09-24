import { makeSource } from 'contentlayer/source-files'

import mdx from './cl-config/mdx'
import Post from './cl-config/post'
import Project from './cl-config/project'
import Snippet from './cl-config/snippet'

const contentLayerConfig = makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Project, Snippet],
  mdx,
})

export default contentLayerConfig
