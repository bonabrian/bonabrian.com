import type { Content, ImageMeta } from './content'

export interface Project extends Content {
  description?: string
  image?: string
  imageMeta?: ImageMeta
  url?: string
  category: string
}
