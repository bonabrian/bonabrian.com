'use client'

import { m } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import cn from '@/utils/cn'

interface EmojiReactionProps {
  title: string
  defaultEmoji: string
  animatedEmoji: string
  disabledEmoji: string
  disabled?: boolean
  onClick?: () => void
}

type AnimationValue = {
  key: number
  x: number | Array<number>
  y: number | Array<number>
  duration: number
}

const randomBetween = (min: number, max: number): number => {
  return Math.random() * (max - min) + min
}

const getRandomAnimationValue = (): AnimationValue => {
  const key = randomBetween(0, 1000)

  // left and right
  const x = randomBetween(-40, 40)

  // top length
  const y = randomBetween(-230, -170)

  // random duration
  const duration = randomBetween(1.6, 1.9) + y / 1000

  return {
    key,
    x: [0, x - randomBetween(-10, 10), x],
    y,
    duration,
  }
}

const motion = {
  initial: { scale: 1 },
  hover: { scale: 1.2 },
  tap: { scale: 0.8 },
}

const EmojiReaction = ({
  title,
  defaultEmoji,
  animatedEmoji,
  disabledEmoji,
  disabled = false,
  onClick = () => {},
}: EmojiReactionProps) => {
  const [history, setHistory] = useState<Array<AnimationValue>>([])
  const [emoji, setEmoji] = useState<string>(
    disabled ? disabledEmoji : defaultEmoji,
  )

  useEffect(() => {
    if (disabled) setEmoji(disabledEmoji)
  }, [disabled, disabledEmoji])

  const handleClick = () => {
    if (disabled) return

    setHistory((current) => [...current, getRandomAnimationValue()])

    onClick()
  }

  return (
    <m.button
      disabled={disabled}
      title={title}
      aria-label={title}
      whileTap={!disabled ? 'tap' : ''}
      whileHover="hover"
      onHoverStart={() => {
        if (!disabled) {
          setEmoji(animatedEmoji)
        } else {
          setEmoji(disabledEmoji)
        }
      }}
      onHoverEnd={() => {
        if (!disabled) {
          setEmoji(defaultEmoji)
        } else {
          setEmoji(disabledEmoji)
        }
      }}
      onClick={handleClick}
      className={cn(
        'relative cursor-pointer select-none',
        'disabled:cursor-not-allowed',
      )}
    >
      {history.map(({ x, y, duration, key }) => (
        <m.div
          key={key}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x, y, opacity: [1, 1, 0] }}
          transition={{ ease: 'easeOut', duration }}
          onAnimationComplete={() => {
            // remove from DOM
            setHistory((current) => current.filter((el) => el.key !== key))
          }}
          className={cn('pointer-events-none absolute h-10 w-10 select-none')}
        >
          <Image
            src={animatedEmoji}
            alt={title}
            width={48}
            height={38}
            unoptimized
            priority
            className={cn('h-full w-full')}
          />
        </m.div>
      ))}
      <m.div className={cn('pointer-events-none h-10 w-10')} variants={motion}>
        <Image
          className={cn('h-full w-full')}
          alt={title}
          src={emoji}
          width={48}
          height={48}
          unoptimized
          priority
        />
      </m.div>
    </m.button>
  )
}

export default EmojiReaction
