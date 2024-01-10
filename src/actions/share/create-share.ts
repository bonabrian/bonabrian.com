import prisma from '@/lib/prisma'

import type { CreateShareParams } from './types'

const createShare = async ({
  slug,
  sessionId,
  type,
}: CreateShareParams): Promise<void> => {
  await prisma.share.create({
    data: {
      sessionId,
      type,
      content: {
        connectOrCreate: {
          where: { slug },
          create: { slug },
        },
      },
    },
    include: { content: true },
  })
}

export default createShare
