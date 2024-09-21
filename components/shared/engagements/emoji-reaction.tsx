'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { cn, randomBetween } from '@/lib/utils';

interface EmojiReactionProps {
  title: string;
  defaultEmoji: string;
  animatedEmoji: string;
  disabledEmoji: string;
  disabled?: boolean;
  onClick?: () => void;
}

type AnimationValue = {
  key: number;
  x: number | Array<number>;
  y: number | Array<number>;
  duration: number;
};

const getRandomAnimationValue = (): AnimationValue => {
  const key = randomBetween(0, 1000);

  // left and right
  const x = randomBetween(-40, 40);

  // top length
  const y = randomBetween(-230, -170);

  // random duration
  const duration = randomBetween(1.6, 1.9) + y / 1000;

  return {
    key,
    x: [0, x - randomBetween(-10, 10), x],
    y,
    duration,
  };
};

const variants = {
  initial: { scale: 1 },
  hover: { scale: 1.2 },
  tap: { scale: 0.8 },
};

const EmojiReaction = ({
  title,
  defaultEmoji,
  animatedEmoji,
  disabledEmoji,
  disabled = false,
  onClick,
}: EmojiReactionProps) => {
  const [history, setHistory] = useState<Array<AnimationValue>>([]);
  const [emoji, setEmoji] = useState<string>(
    disabled ? disabledEmoji : defaultEmoji,
  );

  useEffect(() => {
    if (disabled) setEmoji(disabledEmoji);
  }, [disabled, disabledEmoji]);

  const handleClick = () => {
    if (disabled) return;

    setHistory((prev) => [...prev, getRandomAnimationValue()]);

    onClick?.();
  };

  return (
    <motion.button
      disabled={disabled}
      title={title}
      aria-label={title}
      whileTap={!disabled ? 'tap' : ''}
      whileHover="hover"
      onHoverStart={() => {
        setEmoji(disabled ? disabledEmoji : animatedEmoji);
      }}
      onHoverEnd={() => {
        setEmoji(disabled ? disabledEmoji : defaultEmoji);
      }}
      onClick={handleClick}
      className={cn(
        'relative cursor-pointer select-none',
        'disabled:cursor-not-allowed',
      )}
    >
      {history.map(({ x, y, duration, key }) => (
        <motion.div
          key={key}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x, y, opacity: [1, 1, 0] }}
          transition={{ ease: 'easeOut', duration }}
          onAnimationComplete={() => {
            // remove from DOM
            setHistory((prev) => prev.filter((el) => el.key !== key));
          }}
          className={cn('pointer-events-none absolute size-10 select-none')}
        >
          <Image
            src={animatedEmoji}
            alt={title}
            width={48}
            height={48}
            unoptimized
            priority
            className={cn('size-full')}
          />
        </motion.div>
      ))}
      <motion.div
        className={cn('pointer-events-none size-10')}
        variants={variants}
      >
        <Image
          className={cn('size-full')}
          alt={title}
          src={emoji}
          width={48}
          height={48}
          unoptimized
          priority
        />
      </motion.div>
    </motion.button>
  );
};

export default EmojiReaction;
