import type { Content, HeroMeta } from './content'

export interface Post extends Content {
  excerpt?: string
  hero?: string
  heroMeta?: HeroMeta
  heroSource?: string
  keywords?: Array<string>
  tags?: Array<string>
}
