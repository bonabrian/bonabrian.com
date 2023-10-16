import type { NextRequest } from 'next/server'

import { getAccountContributions } from '@/app/(insights)/dashboard/_lib/github'
import type { AccountType } from '@/data/app'
import { getErrorMessage, response } from '@/lib/api'

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url)
    const hasType = searchParams.has('type')
    const type = hasType ? searchParams.get('type') : ''

    const data = await getAccountContributions(type as AccountType)

    return response(data)
  } catch (err) {
    return response({ message: getErrorMessage(err) }, 500)
  }
}
