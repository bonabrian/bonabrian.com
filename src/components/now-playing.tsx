'use client'

import { Popover } from '@headlessui/react'
import Image from 'next/image'
import { useState } from 'react'

import cn from '@/lib/cn'
import { max } from '@/lib/screens'
import type { Device, NowPlaying as Playing } from '@/types/spotify'

import { useAvailableDevices, useMediaQuery, useNowPlaying } from '../hooks'
import DevicePopover from './device-popover'
import { ChevronRight, Speaker, Spotify } from './icons'
import PlayerPopover from './player-popover'

const handleOpenSongUrl = (url?: string) => url && window.open(url, '_blank')

const trimString = (text?: string, maxLength: number = 20): string =>
  (text &&
    text?.slice(0, maxLength) + (text?.length > maxLength ? '...' : '')) ??
  ''

const NowPlayingCard = ({
  playingData,
  isExpanded = false,
}: {
  playingData?: Playing
  isExpanded?: boolean
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
              onClick={() => handleOpenSongUrl(playingData?.songUrl)}
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

const NowPlayingBar = ({
  playingData,
  devices,
}: {
  playingData?: Playing
  devices?: Device[]
}) => {
  const activeDevice = devices?.find((device) => device.is_active)

  const [showPlayingInfo, setShowPlayingInfo] = useState(false)
  const [showDeviceList, setShowDeviceList] = useState(false)

  return (
    <div className={cn('fixed bottom-0 w-full z-[999]')}>
      <div
        className={cn(
          'flex justify-between bg-spotify text-sm px-4 py-1 text-neutral-800 dark:text-neutral-900 font-plus-jakarta',
        )}
      >
        {playingData?.songUrl ? (
          <>
            <Popover className={cn('relative')}>
              <Popover.Button
                as="div"
                onMouseEnter={() => setShowPlayingInfo(true)}
                onMouseLeave={() => setShowPlayingInfo(false)}
              >
                <div className={cn('flex items-center gap-2')}>
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
                  <div className={cn('flex')}>Now Playing: </div>
                  <div
                    className={cn(
                      'flex items-center gap-2 transition-all duration-200',
                    )}
                  >
                    {playingData?.albumImageUrl && (
                      <Image
                        src={playingData?.albumImageUrl}
                        alt={playingData?.album}
                        className={cn('rounded-sm')}
                        width={16}
                        height={16}
                        unoptimized
                      />
                    )}
                    <div
                      className={cn(
                        'flex gap-1',
                        'hover:underline hover:cursor-pointer',
                      )}
                      onClick={() => handleOpenSongUrl(playingData.songUrl)}
                    >
                      <span>
                        {playingData?.artist ? `${playingData?.artist} -` : ''}
                      </span>
                      <span>{playingData?.title}</span>
                    </div>
                  </div>
                </div>
              </Popover.Button>
              <PlayerPopover show={showPlayingInfo} playing={playingData} />
            </Popover>

            <Popover className={cn('relative')}>
              <Popover.Button
                as="div"
                onMouseEnter={() => setShowDeviceList(true)}
                onMouseLeave={() => setShowDeviceList(false)}
              >
                <div className={cn('flex items-center gap-1')}>
                  <Speaker className={cn('w-4 h-4')} />
                  <div>
                    Listening on{' '}
                    <span className={cn('font-medium')}>
                      {activeDevice?.name}
                    </span>
                  </div>
                </div>
              </Popover.Button>
              <DevicePopover show={showDeviceList} devices={devices} />
            </Popover>
          </>
        ) : (
          <div className={cn('flex items-center gap-2')}>
            <Spotify className={cn('w-4 h-4')} />
            <div>Not Playing</div>
          </div>
        )}
      </div>
    </div>
  )
}

const NowPlaying = () => {
  const isMaxMd = useMediaQuery(max('md'))

  const { data: playingData } = useNowPlaying()
  const { data: devices } = useAvailableDevices()

  return isMaxMd ? (
    <NowPlayingCard playingData={playingData} />
  ) : (
    <NowPlayingBar playingData={playingData} devices={devices} />
  )
}

export default NowPlaying
