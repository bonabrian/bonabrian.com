import prisma from '@/lib/prisma'

import type { CountContentSharesParams } from './types'

const countContentShares = async ({
  slug,
}: CountContentSharesParams): Promise<number> => {
  const result = await prisma.contentMeta.findFirst({
    where: { slug },
    include: {
      _count: {
        select: { shares: true },
      },
    },
  })

  return result?._count.shares ?? 0
}

export default countContentShares
