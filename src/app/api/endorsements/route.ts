import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { defaultHeaders, getErrorMessage } from '@/lib/api'
import { authOptions } from '@/lib/auth'
import { getEndorsements } from '@/lib/db'
import prisma from '@/lib/prisma'

export const POST = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new NextResponse(JSON.stringify({ message: 'Unauthenticated' }), {
        status: 401,
        headers: defaultHeaders,
      })
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
      return new NextResponse(
        JSON.stringify({ message: 'You already endorse this skill' }),
        { status: 409, headers: defaultHeaders },
      )
    }

    await prisma.endorsement.create({
      data: {
        skill_id: Number(skillId),
        userId: session.id as string,
      },
    })

    return new NextResponse('', { status: 201, headers: defaultHeaders })
  } catch (err) {
    return new NextResponse(getErrorMessage(err), {
      status: 500,
      headers: defaultHeaders,
    })
  }
}

export const GET = async () => {
  try {
    const endorsements = await getEndorsements()

    return NextResponse.json(endorsements)
  } catch (err) {
    return new NextResponse(getErrorMessage(err), {
      status: 500,
      headers: defaultHeaders,
    })
  }
}
