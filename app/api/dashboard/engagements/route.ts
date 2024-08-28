import { countAllEndorsements } from '@/actions/endorsements';
import { countAllReactions } from '@/actions/reactions';
import { countAllViews } from '@/actions/views';
import { response } from '@/lib/server';
import type { APIErrorResponse, APISingleResponse } from '@/types/server';
import type { EngagementStats } from '@/types/stats';

export const dynamic = 'force-dynamic';

export const GET = async () => {
  try {
    const [views, reactions, endorsements] = await Promise.all([
      countAllViews(),
      countAllReactions(),
      countAllEndorsements(),
    ]);

    return response<APISingleResponse<EngagementStats>>({
      data: {
        views,
        reactions,
        endorsements,
      },
    });
  } catch (error) {
    return response<APIErrorResponse>({
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};
