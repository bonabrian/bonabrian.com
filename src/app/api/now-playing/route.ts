import { NextResponse } from 'next/server'

import { getNowPlaying } from '@/lib/spotify'

export const GET = async () => {
  try {
    const track = await getNowPlaying()

    if (!track || !track.isPlaying) {
      return NextResponse.json({ isPlaying: false })
    }

    return NextResponse.json(track)
  } catch {
    return NextResponse.json({ isPlaying: false })
  }
}
