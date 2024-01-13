'use server'

import prisma from '@/lib/prisma'

export const countAllReactions = async (): Promise<number> => {
  const count = await prisma.reaction.aggregate({
    _sum: { count: true },
  })

  return count._sum.count ?? 0
}
