import { getServerSession } from 'next-auth'

import { getErrorMessage, response } from '@/lib/api'
import { authOptions } from '@/lib/auth'
import { getEndorsements } from '@/lib/db'
import prisma from '@/lib/prisma'

export const POST = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return response({ message: 'Unauthenticated' }, 401)
    }

    const body = await req.json()
    const { skillId } = body

    const isExists = await prisma.endorsement.findFirst({
      where: {
        skill_id: Number(skillId),
        userId: session.id as string,
      },
    })

    if (isExists) {
      return response({ message: 'You already endorse this skill' }, 409)
    }

    await prisma.endorsement.create({
      data: {
        skill_id: Number(skillId),
        userId: session.id as string,
      },
    })

    return response({}, 201)
  } catch (err) {
    return response({ message: getErrorMessage(err) }, 500)
  }
}

export const GET = async () => {
  try {
    const endorsements = await getEndorsements()

    return response(endorsements)
  } catch (err) {
    return response({ message: getErrorMessage(err) }, 500)
  }
}
