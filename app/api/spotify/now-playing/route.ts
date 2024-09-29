import { getNowPlaying } from '@/actions/spotify';
import { response } from '@/lib/server';
import type { APIErrorResponse, APISingleResponse } from '@/types/server';
import type { NowPlaying } from '@/types/spotify';

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
