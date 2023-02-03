import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'

import prisma from '@/lib/prisma'

import { authOptions } from './auth/[...nextauth]'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const session = await unstable_getServerSession(req, res, authOptions)
      if (!session) {
        return res.status(401).send({ message: 'Unauthenticated' })
      }

      const { skillId } = req.body
      const isExists = await prisma.endorsement.findFirst({
        where: {
          skill_id: Number(skillId),
          userId: session.id as string,
        },
      })

      if (isExists) {
        return res.status(409).json({
          message: 'You already endorse this skill',
        })
      }

      await prisma.endorsement.create({
        data: {
          skill_id: Number(skillId),
          userId: session.id as string,
        },
      })

      return res.status(200).json(true)
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
