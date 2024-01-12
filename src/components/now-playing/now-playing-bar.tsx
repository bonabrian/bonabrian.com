'use client'

import { Popover } from '@headlessui/react'
import Image from 'next/image'
import { useState } from 'react'

import type { Device, NowPlaying } from '@/types/spotify'
import cn from '@/utils/cn'

import { Speaker, Spotify } from '../icons'
import AnimatedBars from './animated-bars'
import DevicePopover from './device-popover'
import PlayerPopover from './player-popover'

const NowPlayingBar = ({
  playingData,
  devices = [],
  onOpenSongUrl,
}: {
  playingData?: NowPlaying
  devices?: Device[]
  onOpenSongUrl: (url?: string) => void
}) => {
  const activeDevice = devices && devices?.find((device) => device.is_active)

  const [showPlayingInfo, setShowPlayingInfo] = useState(false)
  const [showDeviceList, setShowDeviceList] = useState(false)

  return (
    <div className={cn('fixed bottom-0 z-[999] w-full')}>
      <div
        className={cn(
          'flex justify-between bg-spotify px-4 py-1 text-sm text-neutral-800',
          'dark:text-neutral-900',
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
                  <AnimatedBars />
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
                        'hover:cursor-pointer hover:underline',
                      )}
                      onClick={() => onOpenSongUrl(playingData.songUrl)}
                    >
                      <div className={cn('inline-flex')}>
                        <span>{playingData?.artist}</span> -{' '}
                        <span>{playingData?.title}</span>
                      </div>
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
                  <Speaker className={cn('h-4 w-4')} />
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
            <Spotify className={cn('h-4 w-4')} />
            <div>Not Playing</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NowPlayingBar
