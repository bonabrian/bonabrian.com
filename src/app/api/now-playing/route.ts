import { response } from '@/lib/api'
import { getNowPlaying } from '@/lib/spotify'

export const dynamic = 'force-dynamic'

export const GET = async () => {
  try {
    const track = await getNowPlaying()

    if (!track || !track.isPlaying) {
      return response({ isPlaying: false })
    }

    return response(track)
  } catch {
    return response({ isPlaying: false })
  }
}
