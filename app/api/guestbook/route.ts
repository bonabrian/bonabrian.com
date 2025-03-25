import type { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';

import {
  createEntry,
  getGuestbookEntries,
} from '@/features/guestbook/server/actions';
import type { Guestbook } from '@/features/guestbook/types';
import { authOptions } from '@/lib/auth';
import { response } from '@/lib/server';
import type {
  APIErrorResponse,
  APIListResponse,
  APISingleResponse,
} from '@/types/api';

export const GET = async () => {
  try {
    const entries = await getGuestbookEntries();
    return response<APIListResponse<Guestbook>>({ data: entries });
  } catch (error) {
    return response<APIErrorResponse>({
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return response<APIErrorResponse>(
        {
          message: 'Unauthenticated',
        },
        401,
      );
    }

    const body = await req.json();
    const { message } = body;

    await createEntry({ message, userId: session.id as string });

    return response<APISingleResponse<null>>({ data: null }, 201);
  } catch (error) {
    return response<APIErrorResponse>({
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};
