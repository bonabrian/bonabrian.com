import Image from 'next/image'
import { useState } from 'react'

import type { NowPlaying } from '@/types/spotify'
import cn from '@/utils/cn'
import { trim } from '@/utils/string'

import { ChevronRight, Spotify } from '../icons'
import AnimatedBars from './animated-bars'

const NowPlayingCard = ({
  playingData,
  isExpanded = false,
  onOpenSongUrl,
}: {
  playingData?: NowPlaying
  isExpanded?: boolean
  onOpenSongUrl: (url?: string) => void
}) => {
  const [expanded, setExpanded] = useState(isExpanded)

  const trimmedSongTitle = trim(playingData?.title, 40)
  const trimmedSongArtist = trim(playingData?.artist)

  if (!playingData?.songUrl) return null

  return (
    <div
      className={cn(
        'fixed bottom-0 z-[999] w-full p-3',
        !expanded && 'flex justify-end',
      )}
    >
      {!expanded ? (
        <div
          className={cn(
            'cursor-pointer rounded-full bg-card text-spotify transition-all duration-200',
          )}
          onClick={() => setExpanded(!expanded)}
        >
          <Spotify className={cn('animate-pulse')} />
        </div>
      ) : (
        <div
          className={cn(
            'flex items-center justify-between rounded-md bg-spotify p-2 text-neutral-800',
            'dark:text-neutral-900',
          )}
        >
          <div className={cn('flex items-center gap-3')}>
            {playingData?.albumImageUrl && (
              <Image
                className={cn('rounded-md')}
                unoptimized
                alt={playingData?.album}
                src={playingData?.albumImageUrl}
                width={60}
                height={60}
              />
            )}
            <div
              className={cn(
                'flex flex-col',
                'hover:cursor-pointer hover:underline',
              )}
              onClick={() => onOpenSongUrl(playingData?.songUrl)}
            >
              <div className={cn('text-sm font-medium')}>
                {trimmedSongTitle}
              </div>
              <div className={cn('flex items-center gap-2 text-xs')}>
                <AnimatedBars />
                <span className={cn('pt-1 text-sm')}>{trimmedSongArtist}</span>
              </div>
            </div>
          </div>
          <div
            className={cn('mr-0.5 flex cursor-pointer gap-3')}
            onClick={() => setExpanded(!expanded)}
          >
            <ChevronRight className={cn('h-6 w-6 rotate-90')} />
          </div>
        </div>
      )}
    </div>
  )
}

export default NowPlayingCard
