import type { NextRequest } from 'next/server'

import { countContentViews } from '@/actions/views'
import { getErrorMessage, response } from '@/lib/api'

export const GET = async (
  _req: NextRequest,
  { params }: { params: { slug: string } },
) => {
  try {
    const { slug } = params

    const total = await countContentViews({ slug })
    return response<{ total: number }>({ total })
  } catch (err) {
    return response<{ message: string }>({ message: getErrorMessage(err) }, 500)
  }
}
