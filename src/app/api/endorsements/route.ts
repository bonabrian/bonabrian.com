import { getServerSession } from 'next-auth'

import {
  createEndorsement,
  getEndorsements,
  isEndorsed,
} from '@/app/(insights)/endorsements/_lib/endorsements'
import { getErrorMessage, response } from '@/lib/api'
import { authOptions } from '@/lib/auth'

export const POST = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return response({ message: 'Unauthenticated' }, 401)
    }

    const body = await req.json()
    const { skillId } = body

    const alreadyEndorsed = await isEndorsed({
      skillId: Number(skillId),
      userId: session.id as string,
    })

    if (alreadyEndorsed) {
      return response({ message: 'You already endorse this skill' }, 409)
    }

    await createEndorsement({
      skillId: Number(skillId),
      userId: session.id as string,
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
