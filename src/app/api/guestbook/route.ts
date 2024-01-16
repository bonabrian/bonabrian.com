import type { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'

import { addEntry, getGuestbookEntries } from '@/actions/guestbook'
import type { MessageResponse } from '@/lib/api'
import { getErrorMessage, response } from '@/lib/api'
import { authOptions } from '@/lib/auth'
import type { GuestbookEntry } from '@/types/guestbook'

export const GET = async () => {
  try {
    const entries = await getGuestbookEntries()
    return response<GuestbookEntry[] | undefined>(entries)
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
    const { message } = body

    await addEntry({ message, userId: session.id as string })

    return response({}, 201)
  } catch (err) {
    return response<MessageResponse>({ message: getErrorMessage(err) }, 500)
  }
}
