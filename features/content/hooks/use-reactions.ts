import type { ReactionType } from '@prisma/client';
import { useRef } from 'react';

import useRequest from '@/hooks/use-request';
import type { APIErrorResponse, APISingleResponse } from '@/types/api';

import type { Reactions, ReactionsCount } from '../types/reactions';

const reactionTypes: ReactionType[] = [
  'LIKED',
  'CLAPPING',
  'LOVED',
  'THINKING',
];

const initialValue: Reactions = {
  content: {
    reactions: reactionTypes.reduce(
      (acc, type) => ({ ...acc, [type]: 0 }),
      {} as ReactionsCount,
    ),
    total: 0,
  },
  user: {
    reactions: reactionTypes.reduce(
      (acc, type) => ({ ...acc, [type]: 0 }),
      {} as ReactionsCount,
    ),
  },
};

export const useReactions = (slug: string) => {
  const timer = useRef<Record<ReactionType, NodeJS.Timeout | undefined>>(
    reactionTypes.reduce(
      (acc, type) => ({ ...acc, [type]: undefined }),
      {} as Record<ReactionType, NodeJS.Timeout | undefined>,
    ),
  );

  const count = useRef<ReactionsCount>(
    reactionTypes.reduce(
      (acc, type) => ({ ...acc, [type]: 0 }),
      {} as ReactionsCount,
    ),
  );

  const { data, isLoading, mutate } = useRequest<
    APISingleResponse<Reactions>,
    APIErrorResponse
  >(`/api/reactions/${slug}`, undefined, {
    fallbackData: { data: initialValue },
  });

  const reactions = data?.data ?? initialValue;

  const addReaction = (type: ReactionType) => {
    // optimistic update
    mutate(
      {
        ...data,
        data: {
          content: {
            reactions: {
              ...reactions.content.reactions,
              [type]: reactions.content.reactions[type] + 1,
            },
            total: reactions.content.total + 1,
          },
          user: {
            reactions: {
              ...reactions.user.reactions,
              [type]: reactions.user.reactions[type] + 1,
            },
          },
        },
      },
      false,
    );

    count.current[type] += 1;

    // debounce
    clearTimeout(timer.current[type]);
    timer.current[type] = setTimeout(async () => {
      await fetch(`/api/reactions/${slug}`, {
        method: 'POST',
        body: JSON.stringify({ type, count: count.current[type] }),
      }).finally(() => {
        // reset click
        count.current[type] = 0;
      });
    }, 500);
  };

  return { reactions, addReaction, isLoading };
};
