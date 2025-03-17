import { countAllReactions } from '@/features/content/server/reactions';
import { countAllViews } from '@/features/content/server/views';
import type { EngagementStats } from '@/features/dashboard/types/stats';
import { countAllEndorsements } from '@/features/endorsements/server/actions';
import { response } from '@/lib/server';
import type { APIErrorResponse, APISingleResponse } from '@/types/server';

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
