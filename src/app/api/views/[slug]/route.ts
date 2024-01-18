import type { NextRequest } from 'next/server'

import { countContentViews, countUserViews, createView } from '@/actions/views'
import { MAX_VIEWS_PER_SESSION } from '@/config/engagements'
import type { MessageResponse } from '@/lib/api'
import { getErrorMessage, response } from '@/lib/api'
import { getSessionId } from '@/utils/session'

export const GET = async (
  _req: NextRequest,
  { params }: { params: { slug: string } },
) => {
  try {
    const { slug } = params

    const total = await countContentViews({ slug })
    return response<{ total: number }>({ total })
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

    const currentViews = await countUserViews({ slug, sessionId })

    if (currentViews < MAX_VIEWS_PER_SESSION) {
      await createView({ slug, sessionId })
      return response({}, 201)
    }

    // conflict exceeded maximum limit
    return response<MessageResponse>({ message: 'Maximum limit exceeded' }, 409)
  } catch (err) {
    return response<MessageResponse>({ message: getErrorMessage(err) }, 500)
  }
}
