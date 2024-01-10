import prisma from '@/lib/prisma'

import type { CreateReactionParams } from './types'

const createReaction = async ({
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

export default createReaction
