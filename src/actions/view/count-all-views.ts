import prisma from '@/lib/prisma'

const countAllViews = async (): Promise<number> => {
  return await prisma.view.count()
}

export default countAllViews
