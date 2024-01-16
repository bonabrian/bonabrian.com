import type { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'

import {
  createEndorsement,
  getEndorsements,
  isEndorsed,
} from '@/actions/endorsements'
import type { MessageResponse } from '@/lib/api'
import { getErrorMessage, response } from '@/lib/api'
import { authOptions } from '@/lib/auth'
import type { SkillCategory } from '@/types/skill'

export const GET = async () => {
  try {
    const endorsements = await getEndorsements()
    return response<SkillCategory[]>(endorsements)
  } catch (err) {
    return response<MessageResponse>({ message: getErrorMessage(err) }, 500)
  }
}
export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return response<MessageResponse>({ message: 'Unauthenticated' }, 401)
    }

    const body = await req.json()
    const { skillId } = body

    const alreadyEndorsed = await isEndorsed({
      skillId: Number(skillId),
      userId: session.id as string,
    })

    if (alreadyEndorsed) {
      return response<MessageResponse>(
        { message: 'You already endorse this skill' },
        409,
      )
    }

    await createEndorsement({
      skillId: Number(skillId),
      userId: session.id as string,
    })

    return response({}, 201)
  } catch (err) {
    return response<MessageResponse>({ message: getErrorMessage(err) }, 500)
  }
}
