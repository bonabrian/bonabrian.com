import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const data = await prisma.counter.aggregate({
        _sum: {
          loves: true,
          likes: true,
          stars: true,
        },
      })

      const result = {
        loves: (data._sum.loves || 0).toString(),
        likes: (data._sum.likes || 0).toString(),
        stars: (data._sum.stars || 0).toString(),
      }

      return res.status(200).json(result)
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
