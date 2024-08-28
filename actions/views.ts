'use server';

import db from '@/lib/db';

export const countAllViews = async (): Promise<number> => {
  return await db.view.count();
};
