import { response } from '@/lib/api'
import { getNowPlaying } from '@/lib/spotify'
import type { NowPlaying } from '@/types/spotify'

export const dynamic = 'force-dynamic'

export const GET = async () => {
  try {
    const track = await getNowPlaying()

    if (!track?.isPlaying) {
      return response<{ isPlaying: boolean }>({ isPlaying: false })
    }

    return response<NowPlaying>(track)
  } catch {
    return response<{ isPlaying: boolean }>({ isPlaying: false })
  }
}
