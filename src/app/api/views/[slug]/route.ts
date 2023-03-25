import type { NextRequest } from 'next/server'

import { getErrorMessage, response } from '@/lib/api'
import prisma from '@/lib/prisma'

export const GET = async (
  _req: NextRequest,
  { params }: { params: { slug: string } },
) => {
  try {
    const { slug } = params
    const counter = await prisma.counter.findUnique({
      where: { slug },
    })
    const total = (counter?.views || 0).toString()

    return response({ total })
  } catch (err) {
    return response({ message: getErrorMessage(err) }, 500)
  }
}

export const POST = async (
  _req: NextRequest,
  { params }: { params: { slug: string } },
) => {
  try {
    const { slug } = params
    const upsertViews = await prisma.counter.upsert({
      where: { slug },
      create: { slug, views: 1 },
      update: { views: { increment: 1 } },
    })

    return response({ total: upsertViews.views.toString() })
  } catch (err) {
    return response({ message: getErrorMessage(err) }, 500)
  }
}
