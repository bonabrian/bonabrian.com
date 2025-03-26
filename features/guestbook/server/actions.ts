'use server';

import type { Prisma } from '@prisma/client';

import db from '@/lib/db';

import type { Guestbook } from '../types';

export const getGuestbookEntries = async (): Promise<Guestbook[]> => {
  const entries = await db.guestbook.findMany({
    orderBy: { created_at: 'asc' },
    select: { id: true, body: true, created_at: true, user: true },
  });

  return (entries ?? []).map(({ id, body, created_at, user }) => ({
    id: id.toString(),
    body,
    createdAt: created_at.toISOString(),
    user: {
      id: user!.id!,
      name: user!.name!,
      email: user!.email!,
      image: user!.image!,
    },
  }));
};

export const createEntry = async ({
  userId,
  message,
}: {
  userId: string;
  message: string;
}): Promise<void> => {
  await db.guestbook.create({
    data: {
      body: message,
      userId,
    },
  });
};

export const deleteEntry = async (id: number): Promise<void> => {
  await db.guestbook.delete({ where: { id } });
};

export const countGuestbook = async (
  where: Prisma.GuestbookWhereInput,
): Promise<number> => {
  return await db.guestbook.count({
    where,
  });
};
