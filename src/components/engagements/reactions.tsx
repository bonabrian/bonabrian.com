'use client'

import type { ReactionType } from '@prisma/client'
import { m, useAnimationControls } from 'framer-motion'
import { useEffect } from 'react'

import { MAX_REACTIONS_PER_SESSION } from '@/config/engagements'
import useReactions from '@/hooks/use-reactions'
import cn from '@/utils/cn'

import { Counter } from '../ui'
import EmojiReaction from './emoji-reaction'

interface ReactionsProps {
  slug: string
}

const Reactions = ({ slug }: ReactionsProps) => {
  const { reactions, addReaction, loading } = useReactions(slug)

  const controls = useAnimationControls()

  useEffect(() => {
    if (!loading) {
      controls.start({
        y: 0,
        opacity: 1,
        pointerEvents: 'auto',
        transition: {
          delay: 0.2,
          duration: 0.15,
        },
      })
    }
  }, [controls, loading])

  const userReactions = reactions?.user?.reactions
  const contentReactions = reactions?.content?.reactions

  const {
    LIKED = 0,
    CLAPPING = 0,
    LOVED = 0,
    THINKING = 0,
  } = contentReactions ?? {}

  const getRemainingQuota = (type: ReactionType) => {
    return MAX_REACTIONS_PER_SESSION - (userReactions?.[type] ?? 0)
  }

  const reachMaximumQuota = (type: ReactionType) => {
    return getRemainingQuota(type) <= 0
  }

  const emojiReactions = [
    {
      title: 'Like',
      defaultEmoji: '/emojis/thumbs-up.png',
      animatedEmoji: '/emojis/thumbs-up-animated.png',
      disabledEmoji: '/emojis/victory-hand.png',
      type: 'LIKED',
      counter: <Counter count={LIKED} />,
    },
    {
      title: 'Claps',
      defaultEmoji: '/emojis/clapping-hands.png',
      animatedEmoji: '/emojis/clapping-hands-animated.png',
      disabledEmoji: '/emojis/love-you-gesture.png',
      type: 'CLAPPING',
      counter: <Counter count={CLAPPING} />,
    },
    {
      title: 'Love',
      defaultEmoji: '/emojis/smiling-face-with-heart-eyes.png',
      animatedEmoji: '/emojis/smiling-face-with-heart-eyes-animated.png',
      disabledEmoji: '/emojis/smiling-face-with-hearts.png',
      type: 'LOVED',
      counter: <Counter count={LOVED} />,
    },
    {
      title: 'Think',
      defaultEmoji: '/emojis/thinking-face.png',
      animatedEmoji: '/emojis/thinking-face-animated.png',
      disabledEmoji: '/emojis/face-with-monocle.png',
      type: 'THINKING',
      counter: <Counter count={THINKING} />,
    },
  ]

  return (
    <m.div
      className={cn('pointer-events-none relative flex items-center')}
      initial={{
        y: 16,
        opacity: 0,
        pointerEvents: 'none',
      }}
      animate={controls}
    >
      <div className={cn('flex items-center gap-4')}>
        {emojiReactions.map(
          ({
            title,
            defaultEmoji,
            animatedEmoji,
            disabledEmoji,
            type,
            counter,
          }) => (
            <div className={cn('flex flex-col items-center gap-2')} key={title}>
              <EmojiReaction
                title={title}
                defaultEmoji={defaultEmoji}
                animatedEmoji={animatedEmoji}
                disabledEmoji={disabledEmoji}
                disabled={reachMaximumQuota(type as ReactionType)}
                onClick={() => {
                  addReaction(type as ReactionType)
                }}
              />
              {counter}
            </div>
          ),
        )}
      </div>
    </m.div>
  )
}

export default Reactions
