import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const totalViews = await prisma.view.aggregate({
        _sum: {
          count: true,
        },
      })

      return (
        res
          .status(200)
          // eslint-disable-next-line no-underscore-dangle
          .json({ total: (totalViews._sum.count || 0).toString() })
      )
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
