import type { Content } from './content'

export interface Snippet extends Content {
  readonly type: 'Snippet'
  description?: string
}
