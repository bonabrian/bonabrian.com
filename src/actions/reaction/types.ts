import type { ReactionType } from '@prisma/client'

export interface CreateReactionParams {
  slug: string
  sessionId: string
  type: ReactionType
  count: number
}

export interface GetReactionsParams {
  slug: string
  sessionId?: string
}
