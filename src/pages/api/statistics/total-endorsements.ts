import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const totalEndorsements = await prisma.endorsement.count()
      return res.status(200).json({
        total: (totalEndorsements || 0).toString(),
      })
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

export default withSentry(handler)
