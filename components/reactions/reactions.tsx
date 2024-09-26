'use client';

import type { ReactionType } from '@prisma/client';
import { motion, useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';

import { MAX_REACTIONS_PER_SESSION } from '@/constants';
import useReactions from '@/hooks/use-reactions';
import { cn } from '@/lib/utils';

import Counter from '../shared/counter';
import EmojiReaction from './emoji-reaction';

const Reactions = ({ slug }: { slug: string }) => {
  const { reactions, addReaction, isLoading } = useReactions(slug);
  const controls = useAnimationControls();

  useEffect(() => {
    if (!isLoading) {
      controls.start({
        y: 0,
        opacity: 1,
        pointerEvents: 'auto',
        transition: {
          delay: 0.5,
          duration: 0.15,
        },
      });
    }
  }, [controls, isLoading]);

  const userReactions = reactions.user.reactions;
  const contentReactions = reactions.content.reactions;

  const { LIKED = 0, CLAPPING = 0, LOVED = 0, THINKING = 0 } = contentReactions;

  const getRemainingQuota = (type: ReactionType): number =>
    MAX_REACTIONS_PER_SESSION - (userReactions[type] ?? 0);

  const isReachMaximumQuota = (type: ReactionType): boolean =>
    getRemainingQuota(type) <= 0;

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
  ];

  return (
    <motion.div
      className={cn('pointer-events-none relative flex items-center')}
      initial={{ y: 16, opacity: 0, pointerEvents: 'none' }}
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
            <div key={title} className={cn('flex flex-col items-center gap-2')}>
              <EmojiReaction
                title={title}
                defaultEmoji={defaultEmoji}
                animatedEmoji={animatedEmoji}
                disabledEmoji={disabledEmoji}
                disabled={isReachMaximumQuota(type as ReactionType)}
                onClick={() => {
                  addReaction(type as ReactionType);
                }}
              />
              {counter}
            </div>
          ),
        )}
      </div>
    </motion.div>
  );
};

export default Reactions;
