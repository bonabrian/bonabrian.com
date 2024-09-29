import {
  getAllTimeSinceToday,
  getLastSevenDaysStats,
} from '@/actions/wakatime';
import { response } from '@/lib/server';
import type { APIErrorResponse, APISingleResponse } from '@/types/server';
import type { CodingActivityStats } from '@/types/stats';

export const dynamic = 'force-dynamic';

export const GET = async () => {
  try {
    const lastSevenDaysStats = await getLastSevenDaysStats();
    const allTimeSinceToday = await getAllTimeSinceToday();

    return response<APISingleResponse<CodingActivityStats>>({
      data: {
        ...lastSevenDaysStats,
        all_time_since_today: allTimeSinceToday,
      },
    });
  } catch (error) {
    return response<APIErrorResponse>({
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};
