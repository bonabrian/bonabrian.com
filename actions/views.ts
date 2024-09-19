'use server';

import db from '@/lib/db';

export const countAllViews = async (): Promise<number> => {
  return await db.view.count();
};

export const countViewsBySlug = async (slug: string): Promise<number> => {
  const result = await db.contentMeta.findFirst({
    where: { slug },
    include: {
      _count: {
        select: { views: true },
      },
    },
  });

  return result?._count.views ?? 0;
};
