'use client'

import Image from 'next/image'
import { useState } from 'react'

import cn from '@/lib/cn'
import type { NowPlaying } from '@/types/spotify'

import { ChevronRight, Spotify } from '../icons'

const trimString = (text?: string, maxLength: number = 20): string =>
  (text &&
    text?.slice(0, maxLength) + (text?.length > maxLength ? '...' : '')) ??
  ''

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

  const trimmedSongTitle = trimString(playingData?.title, 40)
  const trimmedSongArtist = trimString(playingData?.artist)

  if (!playingData?.songUrl) return null

  return (
    <div
      className={cn(
        'fixed bottom-0 w-full p-3 z-[999]',
        !expanded && 'flex justify-end',
      )}
    >
      {!expanded ? (
        <div
          className={cn(
            'bg-card rounded-full cursor-pointer transition-all duration-200 text-spotify',
          )}
          onClick={() => setExpanded(!expanded)}
        >
          <Spotify className={cn('animate-pulse')} />
        </div>
      ) : (
        <div
          className={cn(
            'flex items-center justify-between p-2 bg-spotify font-plus-jakarta rounded-md text-neutral-800',
            'dark:text-neutral-900',
          )}
        >
          <div className={cn('flex gap-3 items-center')}>
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
                'flex flex-col hover:underline hover:cursor-pointer',
              )}
              onClick={() => onOpenSongUrl(playingData?.songUrl)}
            >
              <div className={cn('font-medium text-sm')}>
                {trimmedSongTitle}
              </div>
              <div className={cn('flex gap-2 items-center text-xs')}>
                <div className={cn('equalizer')}>
                  <span
                    className={cn(
                      'bar bg-neutral-800',
                      'dark:text-neutral-900',
                    )}
                  />
                  <span
                    className={cn(
                      'bar bg-neutral-800',
                      'dark:text-neutral-900',
                    )}
                  />
                  <span
                    className={cn(
                      'bar bg-neutral-800',
                      'dark:text-neutral-900',
                    )}
                  />
                  <span
                    className={cn(
                      'bar bg-neutral-800',
                      'dark:text-neutral-900',
                    )}
                  />
                  <span
                    className={cn(
                      'bar bg-neutral-800',
                      'dark:text-neutral-900',
                    )}
                  />
                </div>
                <span className={cn('text-sm pt-1')}>{trimmedSongArtist}</span>
              </div>
            </div>
          </div>
          <div
            className={cn('flex gap-3 mr-0.5 cursor-pointer')}
            onClick={() => setExpanded(!expanded)}
          >
            <ChevronRight className={cn('rotate-90 w-6 h-6')} />
          </div>
        </div>
      )}
    </div>
  )
}

export default NowPlayingCard
