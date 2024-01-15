import type { ShareType } from '@prisma/client'

import prisma from '@/lib/prisma'

interface ShareParams {
  slug: string
  sessionId: string
  type: ShareType
}

interface CreateShareParams extends ShareParams {}
interface CountUserSharesParams extends ShareParams {}
type CountContentSharesParams = Pick<ShareParams, 'slug'>

export const countContentShares = async ({
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

export const countUserShares = async ({
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

export const createShare = async ({
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
