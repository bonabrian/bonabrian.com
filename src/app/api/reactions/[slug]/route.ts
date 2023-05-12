import type { NextRequest } from 'next/server'

import { getErrorMessage, response } from '@/lib/api'
import prisma from '@/lib/prisma'
import { reactionMapper } from '@/lib/utils'
import type { ReactionType } from '@/types'

export const GET = async (
  _req: NextRequest,
  { params }: { params: { slug: string } },
) => {
  try {
    const { slug } = params
    const counters = await prisma.counter.findUnique({
      where: { slug },
      select: {
        loves: true,
        likes: true,
        stars: true,
      },
    })

    return response({
      loves: (counters?.loves || 0).toString(),
      likes: (counters?.likes || 0).toString(),
      stars: (counters?.stars || 0).toString(),
    })
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

    const { action, modifier } = body
    const objectToUpdate = {}

    const modifiedReaction = modifier === 'decrement' ? -1 : +1
    const reaction = reactionMapper[action as ReactionType]

    // @ts-ignore
    objectToUpdate[reaction] = { increment: modifiedReaction }

    const counters = await prisma.counter.upsert({
      where: { slug },
      create: { slug, [reaction]: modifiedReaction },
      update: objectToUpdate,
    })

    return response({
      loves: (counters?.loves || 0).toString(),
      likes: (counters?.likes || 0).toString(),
      stars: (counters?.stars || 0).toString(),
    })
  } catch (err) {
    return response({ message: getErrorMessage(err) }, 500)
  }
}
