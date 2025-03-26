import type { ReactionType } from '@prisma/client';

export type ReactionsCount = Record<ReactionType, number>;

interface ContentReactions {
  reactions: ReactionsCount;
  total: number;
}

interface UserReactions {
  reactions: ReactionsCount;
}

export interface Reactions {
  content: ContentReactions;
  user: UserReactions;
}
