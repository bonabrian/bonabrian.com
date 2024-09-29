'use server';

import db from '@/lib/db';
import type { Guestbook } from '@/types/guestbook';

export const getGuestbookEntries = async (): Promise<Guestbook[]> => {
  const entries = await db.guestbook.findMany({
    orderBy: { created_at: 'asc' },
    select: { id: true, body: true, created_at: true, user: true },
  });

  return (entries ?? []).map<Guestbook>(({ id, body, created_at, user }) => ({
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

export const addGuestbookEntry = async ({
  userId,
  message,
}: {
  userId: string;
  message: string;
}) => {
  await db.guestbook.create({
    data: {
      body: message,
      userId,
    },
  });
};

export const findEntryById = async (id: number) => {
  return await db.guestbook.findFirst({
    where: { id },
    select: { id: true, body: true, created_at: true, user: true },
  });
};

export const deleteEntry = async (id: number) => {
  await db.guestbook.delete({ where: { id } });
};
