import type { ReactionType } from '@prisma/client'
import type { NextRequest } from 'next/server'

import { createReaction, getReactions } from '@/app/(collections)/actions'
import { MAX_REACTIONS_PER_SESSION } from '@/data/app'
import { getErrorMessage, response } from '@/lib/api'
import { getSessionId } from '@/lib/server'

export const GET = async (
  req: NextRequest,
  { params }: { params: { slug: string } },
) => {
  try {
    const { slug } = params
    const sessionId = getSessionId(req)

    const contentReactions = await getReactions({ slug })
    const userReactions = await getReactions({ slug, sessionId })

    const total =
      contentReactions.LIKED +
      contentReactions.CLAPPING +
      contentReactions.LOVED +
      contentReactions.THINKING

    return response(
      {
        content: {
          reactions: contentReactions,
          total,
        },
        user: {
          reactions: userReactions,
        },
      },
      200,
    )
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
    const body = await req.json()
    const sessionId = getSessionId(req)

    const type = body.type
    const count = body.count ?? 1

    const reactions = await getReactions({ slug, sessionId })
    const currentReactionsCount = reactions[type as ReactionType]

    if (currentReactionsCount < MAX_REACTIONS_PER_SESSION) {
      // ensure the count not exceeded maximum limit
      const quota = Math.min(
        Math.max(1, count),
        MAX_REACTIONS_PER_SESSION - currentReactionsCount,
      )

      await createReaction({ slug, sessionId, type, count: quota })

      return response({}, 201)
    }

    // conflict exceeded maximum limit
    return response({ message: 'Maximum limit exceeded' }, 409)
  } catch (err) {
    return response({ message: getErrorMessage(err) }, 500)
  }
}
