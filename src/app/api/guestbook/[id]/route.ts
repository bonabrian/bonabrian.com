import type { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'

import { deleteEntry, findEntryById } from '@/app/guestbook/actions'
import { siteConfig } from '@/data/app'
import { getErrorMessage, response } from '@/lib/api'
import { authOptions } from '@/lib/auth'

export const DELETE = async (
  _req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return response({ message: 'Unauthenticated' }, 401)
    }

    const guestbook = await findEntryById({ id: parseInt(params.id) })

    if (!guestbook) {
      return response({ message: 'Not Found' }, 404)
    }

    const isAuthor = session?.user?.email === siteConfig.author.email
    const isBelongToUser = session?.user?.email === guestbook.user?.email

    if (!isBelongToUser && !isAuthor) {
      return response({ message: 'Forbidden' }, 403)
    }

    await deleteEntry({ id: parseInt(params.id) })

    return response(null, 204)
  } catch (err) {
    return response({ message: getErrorMessage(err) }, 500)
  }
}
