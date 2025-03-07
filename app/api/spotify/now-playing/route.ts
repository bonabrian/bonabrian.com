import { getNowPlaying } from '@/features/now-playing/server/actions';
import type { NowPlaying } from '@/features/now-playing/types';
import { response } from '@/lib/server';
import type { APIErrorResponse, APISingleResponse } from '@/types/server';

export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic';

export const GET = async () => {
  try {
    const track = await getNowPlaying();

    if (!track?.isPlaying) {
      return response<APISingleResponse<NowPlaying>>({
        data: { isPlaying: false },
      });
    }

    return response<APISingleResponse<NowPlaying>>({ data: track });
  } catch (error) {
    return response<APIErrorResponse>({
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};
