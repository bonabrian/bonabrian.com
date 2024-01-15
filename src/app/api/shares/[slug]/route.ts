import type { NextRequest } from 'next/server'

import {
  countContentShares,
  countUserShares,
  createShare,
} from '@/actions/shares'
import { MAX_SHARES_PER_SESSION } from '@/config/engagements'
import type { MessageResponse } from '@/lib/api'
import { getErrorMessage, response } from '@/lib/api'
import { getSessionId } from '@/utils/session'

export const GET = async (
  _req: NextRequest,
  { params }: { params: { slug: string } },
) => {
  try {
    const { slug } = params
    const total = await countContentShares({ slug })
    return response({ total })
  } catch (err) {
    return response<MessageResponse>({ message: getErrorMessage(err) }, 500)
  }
}

export const POST = async (
  req: NextRequest,
  { params }: { params: { slug: string } },
) => {
  try {
    const { slug } = params
    const sessionId = getSessionId(req)

    const body = await req.json()
    const { type } = body

    const currentShares = await countUserShares({ slug, sessionId, type })

    if (currentShares < MAX_SHARES_PER_SESSION) {
      await createShare({ slug, sessionId, type })
      return response({}, 201)
    }

    // conflict exceeded maximum limit
    return response<MessageResponse>({ message: 'Maximum limit exceeded' }, 409)
  } catch (err) {
    return response<MessageResponse>({ message: getErrorMessage(err) }, 500)
  }
}
