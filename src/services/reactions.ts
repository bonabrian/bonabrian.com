import type { Prisma, ReactionType } from '@prisma/client'

import prisma from '@/lib/prisma'

interface CreateReactionParams {
  slug: string
  sessionId: string
  type: ReactionType
  count: number
}

interface GetReactionsParams {
  slug: string
  sessionId?: string
}

const mapReactions = (
  reactions: (Prisma.PickArray<Prisma.ReactionGroupByOutputType, 'type'[]> & {
    _sum: {
      count: number | null
    }
  })[],
): Record<ReactionType, number> => {
  const records: Record<ReactionType, number> = {
    LIKED: 0,
    CLAPPING: 0,
    LOVED: 0,
    THINKING: 0,
  }

  reactions.reduce((acc, { type, _sum }) => {
    if (type) {
      records[type as ReactionType] = _sum.count ?? 0
    }

    return acc
  }, {} as Record<ReactionType, number>)

  return records
}

export const createReaction = async ({
  slug,
  sessionId,
  type,
  count,
}: CreateReactionParams): Promise<void> => {
  await prisma.reaction.create({
    data: {
      sessionId,
      type,
      count,
      content: {
        connectOrCreate: {
          where: { slug },
          create: { slug },
        },
      },
    },
  })
}

export const getReactions = async ({
  slug,
  sessionId,
}: GetReactionsParams): Promise<Record<ReactionType, number>> => {
  const conditions = {
    content: { slug },
  }

  if (sessionId) {
    Object.assign(conditions, { sessionId })
  }

  const reactions = await prisma.reaction.groupBy({
    by: ['type'],
    where: conditions,
    _sum: { count: true },
  })

  return mapReactions(reactions)
}
