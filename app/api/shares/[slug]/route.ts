import type { NextRequest } from 'next/server';

import {
  countSharesBySlug,
  countUserShares,
  createShare,
} from '@/actions/shares';
import { MAX_SHARES_PER_SESSION } from '@/constants';
import { getSessionId, response } from '@/lib/server';
import type { APIErrorResponse, APISingleResponse } from '@/types/server';

export const GET = async (
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) => {
  try {
    const { slug } = await params;
    const total = await countSharesBySlug(slug);

    return response<APISingleResponse<{ total: number }>>({ data: { total } });
  } catch (error) {
    return response<APIErrorResponse>({
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) => {
  try {
    const { slug } = await params;
    const sessionId = getSessionId(req);

    const body = await req.json();
    const { type } = body;

    const currentShares = await countUserShares(slug, sessionId, type);

    if (currentShares < MAX_SHARES_PER_SESSION) {
      await createShare(slug, sessionId, type);
      return response<APISingleResponse<null>>({ data: null }, 201);
    }
    return response<APIErrorResponse>(
      {
        message: 'Conflict',
      },
      409,
    );
  } catch (error) {
    return response<APIErrorResponse>({
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};
