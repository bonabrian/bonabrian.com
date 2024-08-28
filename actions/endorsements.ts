'use server';

import db from '@/lib/db';

export const countAllEndorsements = async (): Promise<number> => {
  return await db.endorsement.count();
};
