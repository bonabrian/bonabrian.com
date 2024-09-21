'use server';

import type { Prisma, ReactionType } from '@prisma/client';

import db from '@/lib/db';

export const countAllReactions = async (): Promise<number> => {
  const count = await db.reaction.aggregate({
    _sum: { count: true },
  });

  return count._sum.count ?? 0;
};

const mapReactions = (
  reactions: (Prisma.PickEnumerable<
    Prisma.ReactionGroupByOutputType,
    'type'[]
  > & {
    _sum: { count: number | null };
  })[],
): Record<ReactionType, number> => {
  const records: Record<ReactionType, number> = {
    LIKED: 0,
    CLAPPING: 0,
    LOVED: 0,
    THINKING: 0,
  };

  reactions.forEach(({ type, _sum }) => {
    if (type) {
      records[type] = _sum.count ?? 0;
    }
  });

  return records;
};

export const getReactions = async (slug: string, sessionId?: string) => {
  const conditions = { content: { slug } };

  if (sessionId) {
    Object.assign(conditions, { sessionId });
  }

  const reactions = await db.reaction.groupBy({
    by: ['type'],
    where: conditions,
    _sum: { count: true },
  });

  return mapReactions(reactions);
};

export const addReaction = async ({
  slug,
  sessionId,
  type,
  count,
}: {
  slug: string;
  sessionId: string;
  type: ReactionType;
  count: number;
}) => {
  await db.reaction.create({
    data: {
      sessionId,
      type,
      count,
      content: {
        connectOrCreate: {
          where: { slug },
          create: { slug },
        },
      },
    },
  });
};
