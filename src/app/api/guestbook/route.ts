import type { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'

import { addEntry, getGuestbookEntries } from '@/app/guestbook/_lib/guestbook'
import { getErrorMessage, response } from '@/lib/api'
import { authOptions } from '@/lib/auth'

export const GET = async () => {
  try {
    const entries = await getGuestbookEntries()

    return response(entries)
  } catch (err) {
    return response({ message: getErrorMessage(err) }, 500)
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return response({ message: 'Unauthenticated' }, 401)
    }

    const body = await req.json()
    const { message } = body

    await addEntry({ message, userId: session.id as string })

    return response({}, 201)
  } catch (err) {
    return response({ message: getErrorMessage(err) }, 500)
  }
}
