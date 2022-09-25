import type { Content, HeroMeta } from './content'

export interface Project extends Content {
  description?: string
  hero?: string
  heroMeta?: HeroMeta
  url?: string
}
