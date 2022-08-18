import type { IReadTimeResults } from 'reading-time'

export interface HeroMeta {
  size: { width: number; height: number }
  blur64?: string
}

export interface Post {
  slug: string
  title: string
  date: string
  excerpt?: string
  hero?: string
  heroMeta?: HeroMeta
  readingTime?: IReadTimeResults | null
  keywords?: Array<string>
  tags?: Array<string>
  draft?: boolean
}
