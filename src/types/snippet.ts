import type { IReadTimeResults } from 'reading-time'

export interface Snippet {
  slug: string
  title: string
  description?: string
  date: string
  readingTime?: IReadTimeResults | null
}
