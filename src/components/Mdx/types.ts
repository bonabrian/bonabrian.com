import type { IReadTimeResults } from 'reading-time'

import type { HeroMeta, Post, Snippet } from '@/types'

// TODO: add Project content type
export type Content = Post | Snippet

export interface ContentFields {
  title: string
  description?: string
  slug?: string
  date?: string
  hero?: string
  heroMeta?: HeroMeta
  heroSource?: string
  readingTime?: IReadTimeResults | null
  tags?: Array<string>
  draft?: boolean
}

export type MdxContentProps = {
  content: Content
  children?: React.ReactNode
}

export type ViewsCounterProps = {
  slug?: string
  draft?: boolean
}
