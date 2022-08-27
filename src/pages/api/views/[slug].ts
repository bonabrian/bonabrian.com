import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const slug: string = (req.query.slug || '').toString()

    if (req.method === 'POST') {
      const insertOrUpdateViews = await prisma.view.upsert({
        where: { slug },
        create: { slug, count: 1 },
        update: { count: { increment: 1 } },
      })

      return res
        .status(200)
        .json({ total: insertOrUpdateViews.count.toString() })
    }

    if (req.method === 'GET') {
      const views = await prisma.view.findUnique({
        where: { slug },
      })

      return res.status(200).json({ total: (views?.count || 0).toString() })
    }

    return res.status(405).send({
      message: 'Method not allowed',
    })
  } catch (err) {
    return res.status(500).send({
      // @ts-ignore
      message: err?.message || err?.stackTrace.toString() || 'Unexpected error',
    })
  }
}

export default handler
