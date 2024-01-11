'use client'

import useAvailableDevices from '@/hooks/use-available-devices'
import useMediaQuery from '@/hooks/use-media-query'
import useNowPlaying from '@/hooks/use-now-playing'
import { max } from '@/utils/screens'

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
