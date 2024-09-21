import type { ReactionType } from '@prisma/client';
import { useRef } from 'react';

import type { Reactions } from '@/types/reaction';
import type { APIErrorResponse, APISingleResponse } from '@/types/server';

import useRequest from './use-request';

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
      {} as Record<ReactionType, number>,
    ),
    total: 0,
  },
  user: {
    reactions: reactionTypes.reduce(
      (acc, type) => ({ ...acc, [type]: 0 }),
      {} as Record<ReactionType, number>,
    ),
  },
};

const useReactions = (slug: string) => {
  const timer = useRef<Record<ReactionType, NodeJS.Timeout | undefined>>(
    reactionTypes.reduce(
      (acc, type) => ({ ...acc, [type]: undefined }),
      {} as Record<ReactionType, NodeJS.Timeout | undefined>,
    ),
  );

  const count = useRef<Record<ReactionType, number>>(
    reactionTypes.reduce(
      (acc, type) => ({ ...acc, [type]: 0 }),
      {} as Record<ReactionType, number>,
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
              [type]: (reactions.content.reactions[type] ?? 0) + 1,
            },
            total: (reactions.content.total ?? 0) + 1,
          },
          user: {
            reactions: {
              ...reactions.user.reactions,
              [type]: (reactions.user.reactions[type] ?? 0) + 1,
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

  return {
    reactions,
    addReaction,
    isLoading,
  };
};

export default useReactions;
