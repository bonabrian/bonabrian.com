import type { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';

import { SITE } from '@/constants/site';
import {
  countGuestbook,
  deleteEntry,
} from '@/features/guestbook/server/actions';
import { authOptions } from '@/lib/auth';
import { response } from '@/lib/server';
import type { APIErrorResponse } from '@/types/api';

export const DELETE = async (
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session) {
      return response<APIErrorResponse>(
        {
          message: 'Unauthenticated',
        },
        401,
      );
    }

    const isExists = (await countGuestbook({ id: Number(id) })) > 0;

    if (!isExists) {
      return response<APIErrorResponse>(
        {
          message: 'Not found',
        },
        404,
      );
    }

    const isBelongToUser =
      (await countGuestbook({
        id: Number(id),
        userId: session.id,
      })) > 0;

    const isAuthorOrBelongToUser =
      session.user.email === SITE.author.email || isBelongToUser;

    if (!isAuthorOrBelongToUser) {
      return response<APIErrorResponse>({ message: 'Forbidden' }, 403);
    }

    await deleteEntry(Number(id));

    return response(null, 204);
  } catch (error) {
    return response<APIErrorResponse>({
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};
