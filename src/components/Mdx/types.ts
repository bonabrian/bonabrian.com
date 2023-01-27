import type { ImageProps as NextImageProps } from 'next/image'
import type { IReadTimeResults } from 'reading-time'

import type { HeroMeta, Post, Snippet } from '@/types'

// TODO: add Project content type
export type ContentData = Post | Snippet

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
  backHref?: string
  content: ContentData
  children?: React.ReactNode
}

export type ViewsCounterProps = {
  slug?: string
  draft?: boolean
}

type BaseImageProps = Omit<NextImageProps, 'width' | 'height'>
export type SizeProps = BaseImageProps & { size?: number }
export type DimensionProps = BaseImageProps & {
  width?: number
  height?: number
}

export type ImageProps = (SizeProps | DimensionProps) & {
  shouldOpenLightBox?: boolean
}
