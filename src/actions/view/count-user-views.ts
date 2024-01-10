import prisma from '@/lib/prisma'

import type { CountUserViewsParams } from './types'

const countUserViews = async ({
  slug,
  sessionId,
}: CountUserViewsParams): Promise<number> => {
  const count = await prisma.view.count({
    where: {
      sessionId,
      content: { slug },
    },
  })

  return count ?? 0
}

export default countUserViews
