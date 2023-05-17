import { useEffect, useState } from 'react'

import { reactionMapper } from '@/lib/utils'
import type {
  ReactionModifier,
  ReactionResponse,
  ReactionState,
  ReactionType,
} from '@/types'

import { useRequest } from './useRequest'

const initialReactionState: ReactionState = {
  loved: false,
  liked: false,
  starred: false,
}

export const useReactions = (slug: string) => {
  const [reactions, setReactions] = useState<ReactionResponse | null>()

  const [reactionState, setReactionState] = useState<ReactionState>(() => {
    try {
      return JSON.parse(
        localStorage.getItem(slug) ?? JSON.stringify(initialReactionState),
      )
    } catch (error) {
      return initialReactionState
    }
  })

  const { data, mutate } = useRequest<ReactionResponse>(
    `/api/reactions/${slug}`,
    { refreshInterval: 25000 },
  )

  useEffect(() => {
    localStorage.setItem(slug, JSON.stringify(reactionState))
  }, [reactionState, slug])

  useEffect(() => {
    setReactions(data)
  }, [data])

  const updateReaction = (action: ReactionType) => {
    setReactionState((state) => ({
      ...state,
      [action]: !state[action],
    }))
  }

  const onReacted = async (
    action: ReactionType,
    modifier: ReactionModifier,
  ) => {
    updateReaction(action)

    await fetch(`/api/reactions/${slug}`, {
      method: 'POST',
      body: JSON.stringify({
        action,
        modifier,
      }),
    })

    const reaction = reactionMapper[action]
    const modifiedReaction = modifier === 'decrement' ? -1 : +1

    const currentReactionCount = Number(data?.[reaction]) || 0
    const newReactionCount = Math.max(
      0,
      currentReactionCount + modifiedReaction,
    )
    await mutate({ ...data, [reaction]: newReactionCount })
  }

  const { loved, liked, starred } = reactionState

  return {
    hasLoved: loved,
    hasLiked: liked,
    hasStarred: starred,
    reactions,
    onReacted,
  }
}
