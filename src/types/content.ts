import type { IReadTimeResults } from 'reading-time'

export interface Content {
  slug: string
  title: string
  date?: string | null
  readingTime?: IReadTimeResults | null
  draft?: boolean
}

export interface HeroMeta {
  size: { width: number; height: number }
  blur64?: string
}
