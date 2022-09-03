import { makeSource } from 'contentlayer/source-files'

import mdx from './cl-config/mdx'
import Post from './cl-config/post'
import Snippet from './cl-config/snippet'

const contentLayerConfig = makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Snippet],
  mdx,
})

export default contentLayerConfig
