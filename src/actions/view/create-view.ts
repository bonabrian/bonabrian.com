import prisma from '@/lib/prisma'

import type { CreateViewParams } from './types'

const createView = async ({
  slug,
  sessionId,
}: CreateViewParams): Promise<void> => {
  await prisma.view.create({
    data: {
      sessionId,
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

export default createView
