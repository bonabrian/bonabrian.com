import prisma from '@/lib/prisma'

import type { CountContentViewsParams } from './types'

const countContentViews = async ({
  slug,
}: CountContentViewsParams): Promise<number> => {
  const result = await prisma.contentMeta.findFirst({
    where: { slug },
    include: {
      _count: {
        select: { views: true },
      },
    },
  })

  return result?._count.views ?? 0
}

export default countContentViews
