import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import type { TrackData } from '@/lib/spotify'
import { getNowPlaying } from '@/lib/spotify'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const response = await getNowPlaying()

    if (response.status === 204 || response.status > 400) {
      return res.status(200).json({ isPlaying: false })
    }

    const song = await response.json()
    if (song.item === null) {
      return res.status(200).json({ isPlaying: false })
    }

    const isPlaying = song.is_playing
    const title = song.item.name
    const artist = song.item.artists
      .map((_artist: { name: string }) => _artist.name)
      .join(', ')
    const album = song.item.album.name
    const preAlbumImage = song.item.album.images.pop()
    const albumImage = song.item.album.images.pop() || preAlbumImage
    const url = song.item.external_urls.spotify

    const track: TrackData = {
      title,
      artist,
      album,
      url,
      isPlaying,
      image: albumImage,
    }

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=60, stale-while-revalidate=30',
    )

    return res.status(200).json(track)
  }

  return res.status(405).send({
    message: 'Method not allowed',
  })
}

export default withSentry(handler)
