import prisma from '@/lib/prisma'

import type { CountUserSharesParams } from './types'

const countUserShares = async ({
  slug,
  sessionId,
  type,
}: CountUserSharesParams): Promise<number> => {
  const count = await prisma.share.count({
    where: {
      sessionId,
      type,
      content: { slug },
    },
  })

  return count ?? 0
}

export default countUserShares
