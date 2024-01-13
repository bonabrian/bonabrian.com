'use server'

import prisma from '@/lib/prisma'

export const countAllEndorsements = async (): Promise<number> => {
  return await prisma.endorsement.count()
}
