'use server';

import type { ShareType } from '@prisma/client';

import db from '@/lib/db';

export const countSharesBySlug = async (slug: string): Promise<number> => {
  const result = await db.contentMeta.findFirst({
    where: { slug },
    include: {
      _count: {
        select: { shares: true },
      },
    },
  });

  return result?._count.shares ?? 0;
};

export const countUserShares = async (
  slug: string,
  sessionId: string,
  type: ShareType,
): Promise<number> => {
  const count = await db.share.count({
    where: {
      sessionId,
      type,
      content: { slug },
    },
  });

  return count ?? 0;
};

export const createShare = async (
  slug: string,
  sessionId: string,
  type: ShareType,
): Promise<void> => {
  await db.share.create({
    data: {
      sessionId,
      type,
      content: {
        connectOrCreate: {
          where: { slug },
          create: { slug },
        },
      },
    },
    include: { content: true },
  });
};
