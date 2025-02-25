import type { ReactionType } from '@prisma/client';
import type { NextRequest } from 'next/server';

import { addReaction, getReactions } from '@/actions/reactions';
import { MAX_REACTIONS_PER_SESSION } from '@/constants';
import { getSessionId, response } from '@/lib/server';
import type { Reactions } from '@/types/reaction';
import type { APIErrorResponse, APISingleResponse } from '@/types/server';

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) => {
  try {
    const { slug } = await params;
    const sessionId = getSessionId(req);

    const contentReactions = await getReactions(slug);
    const userReactions = await getReactions(slug, sessionId);

    const total =
      contentReactions.LIKED +
      contentReactions.CLAPPING +
      contentReactions.LOVED +
      contentReactions.THINKING;

    return response<APISingleResponse<Reactions>>({
      data: {
        content: {
          reactions: contentReactions,
          total,
        },
        user: {
          reactions: userReactions,
        },
      },
    });
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
    const body = await req.json();
    const sessionId = getSessionId(req);

    const { type, count } = body;

    const reactions = await getReactions(slug, sessionId);
    const currentReactionsCount = reactions[type as ReactionType];

    if (currentReactionsCount < MAX_REACTIONS_PER_SESSION) {
      // ensure the count not exceeded maximum limit
      const quota = Math.min(
        Math.max(1, count),
        MAX_REACTIONS_PER_SESSION - currentReactionsCount,
      );

      await addReaction({ slug, sessionId, type, count: quota });

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
