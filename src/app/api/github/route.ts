import type { NextRequest } from 'next/server'

import { getContributions } from '@/actions/github'
import { getErrorMessage, response } from '@/lib/api'
import type { AccountType } from '@/types/github'

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url)
    const hasType = searchParams.has('type')
    const type = hasType ? searchParams.get('type') : ''

    const data = await getContributions(type as AccountType)

    return response(data)
  } catch (err) {
    return response({ message: getErrorMessage(err) }, 500)
  }
}
