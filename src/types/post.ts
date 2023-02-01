import type { Content, ImageMeta } from './content'

export interface Post extends Content {
  readonly type?: 'Post'
  excerpt?: string
  image?: string
  imageMeta?: ImageMeta
  imageSource?: string
  keywords?: Array<string>
  tags?: Array<string>
}
