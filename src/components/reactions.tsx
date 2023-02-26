import classnames from 'classnames'
import {
  RiHeart3Fill,
  RiHeart3Line,
  RiStarFill,
  RiStarLine,
  RiThumbUpFill,
  RiThumbUpLine,
} from 'react-icons/ri'

import { useDebounce, useMounted, useReactions } from '@/hooks'
import fireConfetti from '@/lib/confetti'
import type { ReactionModifier, ReactionType } from '@/types'

const Reactions = ({ slug }: { slug: string }) => {
  const { hasLoved, hasLiked, hasStarred, reactions, onReacted } =
    useReactions(slug)
  const mounted = useMounted()

  const getModifier = (isActive: boolean): ReactionModifier => {
    return isActive ? 'decrement' : 'increment'
  }

  const handleReaction = useDebounce(
    (action: ReactionType, isActive: boolean) => {
      const modifier = getModifier(isActive)
      onReacted(action, modifier)
      if (modifier === 'increment') {
        fireConfetti()
      }
    },
  )

  const baseStyle =
    'py-2 px-3 border rounded-full inline-flex items-center gap-x-1 text-sm font-semibold transition-all ease-in-out duration-150'

  return (
    <div className="flex items-center gap-x-4">
      {mounted && (
        <>
          <button
            type="button"
            aria-label="Love"
            name="Love"
            title="Love"
            className={classnames(
              baseStyle,
              'hover:text-pink-500 hover:border-pink-500 hover:dark:border-pink-500',
              hasLoved
                ? 'text-pink-500 border-pink-500 dark:border-pink-500'
                : '',
            )}
            onClick={() => handleReaction('loved', hasLoved)}
          >
            {hasLoved ? <RiHeart3Fill /> : <RiHeart3Line />}
            <span>{reactions?.loves}</span>
          </button>

          <button
            type="button"
            aria-label="Like"
            name="Like"
            title="Like"
            className={classnames(
              baseStyle,
              'hover:text-blue-500 hover:border-blue-500 hover:dark:border-blue-500',
              hasLiked
                ? 'text-blue-500 border-blue-500 dark:border-blue-500'
                : '',
            )}
            onClick={() => handleReaction('liked', hasLiked)}
          >
            {hasLiked ? <RiThumbUpFill /> : <RiThumbUpLine />}
            <span>{reactions?.likes}</span>
          </button>

          <button
            type="button"
            aria-label="Star"
            name="Star"
            title="Star"
            className={classnames(
              baseStyle,
              'hover:text-yellow-500 hover:border-yellow-500 hover:dark:border-yellow-500',
              hasStarred
                ? 'text-yellow-500 border-yellow-500 dark:border-yellow-500'
                : '',
            )}
            onClick={() => handleReaction('starred', hasStarred)}
          >
            {hasStarred ? <RiStarFill /> : <RiStarLine />}
            <span>{reactions?.stars}</span>
          </button>
        </>
      )}
    </div>
  )
}

export default Reactions
