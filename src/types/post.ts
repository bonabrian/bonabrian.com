import type { Content } from './content'

export interface HeroMeta {
  size: { width: number; height: number }
  blur64?: string
}

export interface Post extends Content {
  excerpt?: string
  hero?: string
  heroMeta?: HeroMeta
  heroSource?: string
  keywords?: Array<string>
  tags?: Array<string>
}
