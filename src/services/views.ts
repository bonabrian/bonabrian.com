import prisma from '@/lib/prisma'

interface ViewParams {
  slug: string
  sessionId: string
}

interface CreateViewParams extends ViewParams {}
interface CountUserViewsParams extends ViewParams {}
type CountContentViewsParams = Pick<ViewParams, 'slug'>

export const createView = async ({
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

export const countUserViews = async ({
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

export const countContentViews = async ({
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
