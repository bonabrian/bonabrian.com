import prisma from '@/lib/prisma'

import type { GuestbookEntry } from '../_types/guestbook'

export const getGuestbookEntries = async (): Promise<
  GuestbookEntry[] | undefined
> => {
  try {
    const entries = await prisma.guestbook.findMany({
      orderBy: {
        created_at: 'asc',
      },
      select: { id: true, body: true, created_at: true, user: true },
    })

    return entries.map<GuestbookEntry>((entry) => ({
      id: entry.id.toString(),
      body: entry.body,
      createdAt: entry.created_at.toString(),
      user: {
        id: entry.user!.id,
        name: entry.user!.name!,
        email: entry.user!.email!,
        image: entry.user!.image!,
      },
    }))
  } catch (err) {
    console.error('Error getting guestbook entries: ', err)
    return []
  }
}

export const addEntry = async ({
  message,
  userId,
}: {
  message: string
  userId: string
}) => {
  await prisma.guestbook.create({
    data: {
      body: message,
      userId,
    },
  })
}

export const findEntryById = async ({ id }: { id: number }) => {
  return await prisma.guestbook.findFirst({
    where: { id },
    select: { id: true, body: true, created_at: true, user: true },
  })
}

export const deleteEntry = async ({ id }: { id: number }) => {
  await prisma.guestbook.delete({
    where: { id },
  })
}
