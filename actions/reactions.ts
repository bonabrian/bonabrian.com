'use server';

import db from '@/lib/db';

export const countAllReactions = async (): Promise<number> => {
  const count = await db.reaction.aggregate({
    _sum: { count: true },
  });

  return count._sum.count ?? 0;
};
