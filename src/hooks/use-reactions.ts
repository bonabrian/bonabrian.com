import type { ReactionType } from '@prisma/client'
import { useRef } from 'react'

import useRequest from './use-request'

type ReactionCounts = Record<ReactionType, number>

type ContentReactions = {
  reactions: ReactionCounts
  total: number
}

type UserReactionStats = {
  reactions: ReactionCounts
}

type ReactionData = {
  content: ContentReactions
  user: UserReactionStats
}

const initialValue: ReactionData = {
  content: {
    reactions: {
      LIKED: 0,
      CLAPPING: 0,
      LOVED: 0,
      THINKING: 0,
    },
    total: 0,
  },
  user: {
    reactions: {
      LIKED: 0,
      CLAPPING: 0,
      LOVED: 0,
      THINKING: 0,
    },
  },
}

const useReactions = (slug: string) => {
  const timer = useRef<Record<ReactionType, NodeJS.Timeout | undefined>>({
    LIKED: undefined,
    CLAPPING: undefined,
    LOVED: undefined,
    THINKING: undefined,
  })

  const count = useRef<Record<ReactionType, number>>({
    LIKED: 0,
    CLAPPING: 0,
    LOVED: 0,
    THINKING: 0,
  })

  const { data, loading, mutate } = useRequest<ReactionData>(
    `/api/reactions/${slug}`,
    {
      fallbackData: initialValue,
    },
  )

  const addReaction = (type: ReactionType) => {
    // optimistic update
    mutate(
      {
        ...data,
        content: {
          reactions: {
            ...data?.content?.reactions,
            [type]: (data?.content?.reactions[type] ?? 0) + 1,
          },
          total: (data?.content?.total ?? 0) + 1,
        },
        user: {
          reactions: {
            ...data?.user?.reactions,
            [type]: (data?.user.reactions[type] ?? 0) + 1,
          },
        },
      },
      false,
    )

    count.current[type] += 1

    // debounce
    clearTimeout(timer.current[type])
    timer.current[type] = setTimeout(() => {
      fetch(`/api/reactions/${slug}`, {
        method: 'POST',
        body: JSON.stringify({ type, count: count.current[type] }),
      }).finally(() => {
        // reset click
        count.current[type] = 0
      })
    }, 500)
  }

  return {
    reactions: data,
    addReaction,
    loading,
  }
}

export default useReactions
