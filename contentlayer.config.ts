import { makeSource } from 'contentlayer/source-files'

import mdx from './cl-config/mdx'
import Post from './cl-config/post'

const contentLayerConfig = makeSource({
  contentDirPath: 'content',
  documentTypes: [Post],
  mdx,
})

export default contentLayerConfig
