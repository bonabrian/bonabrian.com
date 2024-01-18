import type { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'

import { deleteEntry, findEntryById } from '@/actions/guestbook'
import site from '@/config/site'
import type { MessageResponse } from '@/lib/api'
import { getErrorMessage, response } from '@/lib/api'
import { authOptions } from '@/lib/auth'

export const DELETE = async (
  _req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return response<MessageResponse>({ message: 'Unauthenticated' }, 401)
    }

    const guestbook = await findEntryById({ id: Number(params.id) })

    if (!guestbook) {
      return response({ message: 'Not Found' }, 404)
    }

    const isAuthor = session?.user?.email === site.author.email
    const isBelongToUser = session?.user?.email === guestbook.user?.email

    if (!isBelongToUser && !isAuthor) {
      return response({ message: 'Forbidden' }, 403)
    }

    await deleteEntry({ id: Number(params.id) })

    return response(null, 204)
  } catch (err) {
    return response<MessageResponse>({ message: getErrorMessage(err) }, 500)
  }
}
