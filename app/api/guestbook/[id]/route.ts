import type { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';

import { deleteEntry, findEntryById } from '@/actions/guestbook';
import { SITE } from '@/constants';
import { authOptions } from '@/lib/auth';
import { response } from '@/lib/server';
import type { APIErrorResponse } from '@/types/server';

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

    const entry = await findEntryById(Number(id));

    if (!entry) {
      return response<APIErrorResponse>(
        {
          message: 'Not found',
        },
        404,
      );
    }

    const isAuthorOrBelongToUser =
      session.user.email === SITE.author.email ||
      session.user.email === entry.user?.email;

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
