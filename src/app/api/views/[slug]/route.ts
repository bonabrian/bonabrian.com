import type { NextRequest } from 'next/server'

import {
  countContentViews,
  countUserViews,
  createView,
} from '@/app/(content)/actions'
import { MAX_VIEWS_PER_SESSION } from '@/data/app'
import { getErrorMessage, response } from '@/lib/api'
import { getSessionId } from '@/lib/server'

export const GET = async (
  _req: NextRequest,
  { params }: { params: { slug: string } },
) => {
  try {
    const { slug } = params

    const total = await countContentViews({ slug })
    return response({ total })
  } catch (err) {
    return response({ message: getErrorMessage(err) }, 500)
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
    return response({ message: 'Maximum limit exceeded' }, 409)
  } catch (err) {
    return response({ message: getErrorMessage(err) }, 500)
  }
}
