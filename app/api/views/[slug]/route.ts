import type { NextRequest } from 'next/server';

import {
  countViewsBySlug,
  countViewsBySlugAndSessionId,
  createView,
} from '@/actions/views';
import { MAX_VIEWS_PER_SESSION } from '@/constants';
import { getSessionId, response } from '@/lib/server';
import type { APIErrorResponse, APISingleResponse } from '@/types/server';

export const GET = async (
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) => {
  try {
    const { slug } = await params;
    const total = await countViewsBySlug(slug);

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

    const currentViews = await countViewsBySlugAndSessionId(slug, sessionId);

    if (currentViews < MAX_VIEWS_PER_SESSION) {
      await createView(slug, sessionId);
      return response<APISingleResponse<null>>({ data: null }, 201);
    }

    // Conflict exceeded maximum views per session
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
