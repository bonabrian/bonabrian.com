import prisma from '@/lib/prisma'

const countReactions = async (): Promise<number> => {
  const count = await prisma.reaction.aggregate({
    _sum: { count: true },
  })

  return count._sum.count ?? 0
}

export default countReactions
