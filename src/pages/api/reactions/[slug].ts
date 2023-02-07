import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/lib/prisma'
import { reactionMapper } from '@/lib/utils'
import type { ReactionType } from '@/types'

BigInt.prototype.toJSON = function () {
  return this.toString()
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const slug: string = (req.query.slug || '').toString()

    if (req.method === 'POST') {
      const body = JSON.parse(req.body)
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

      return res.status(200).json({
        loves: counters?.loves || 0,
        likes: counters?.likes || 0,
        stars: counters?.stars || 0,
      })
    }

    if (req.method === 'GET') {
      const counters = await prisma.counter.findUnique({
        where: { slug },
        select: {
          loves: true,
          likes: true,
          stars: true,
        },
      })

      return res.status(200).json({
        loves: counters?.loves || 0,
        likes: counters?.likes || 0,
        stars: counters?.stars || 0,
      })
    }

    return res.status(405).send({
      message: 'Method not allowed',
    })
  } catch (err) {
    return res.status(500).send({
      // @ts-ignore
      message: err?.message || err?.stackTrace.toString() || 'Unexpected error',
    })
  }
}

export default withSentry(handler)
