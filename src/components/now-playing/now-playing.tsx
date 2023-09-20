'use client'

import { useAvailableDevices, useMediaQuery, useNowPlaying } from '@/hooks'
import { max } from '@/lib/screens'

import NowPlayingBar from './now-playing-bar'
import NowPlayingCard from './now-playing-card'

const handleOpenSongUrl = (url?: string) => url && window.open(url, '_blank')

const NowPlaying = () => {
  const isMaxMd = useMediaQuery(max('md'))

  const { data: playingData } = useNowPlaying()
  const { data: devices } = useAvailableDevices()

  return isMaxMd ? (
    <NowPlayingCard
      playingData={playingData}
      onOpenSongUrl={handleOpenSongUrl}
    />
  ) : (
    <NowPlayingBar
      playingData={playingData}
      devices={devices}
      onOpenSongUrl={handleOpenSongUrl}
    />
  )
}

export default NowPlaying
