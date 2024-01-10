import type { ShareType } from '@prisma/client'

interface ShareParams {
  slug: string
  sessionId: string
  type: ShareType
}

export interface CreateShareParams extends ShareParams {}
export interface CountUserSharesParams extends ShareParams {}
export type CountContentSharesParams = Pick<ShareParams, 'slug'>
