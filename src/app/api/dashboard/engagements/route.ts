import { countAllEndorsements } from '@/actions/endorsements'
import { countAllReactions } from '@/actions/reactions'
import { countAllViews } from '@/actions/views'
import type { MessageResponse } from '@/lib/api'
import { getErrorMessage, response } from '@/lib/api'

export const dynamic = 'force-dynamic'

export const GET = async () => {
  try {
    const views = await countAllViews()
    const reactions = await countAllReactions()
    const endorsements = await countAllEndorsements()

    return response<{
      views: number
      reactions: number
      endorsements: number
    }>({ views, reactions, endorsements })
  } catch (err) {
    return response<MessageResponse>({ message: getErrorMessage(err) }, 500)
  }
}
