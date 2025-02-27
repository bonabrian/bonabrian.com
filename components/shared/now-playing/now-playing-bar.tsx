import Image from 'next/image';
import { useState } from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { PAIR_DEVICES } from '@/constants';
import { cn } from '@/lib/utils';
import type { Device, NowPlaying } from '@/types/spotify';

import AnimatedBars from '../animated-bars';
import { DeviceX, Speaker, Spotify } from '../icons';
import RenderIf from '../render-if';

const NowPlayingBar = ({
  track,
  onOpenSongUrl,
  devices = [],
}: {
  track?: NowPlaying;
  onOpenSongUrl?: (url?: string) => void;
  devices?: Device[];
}) => {
  const activeDevice = devices.find((device) => device.isActive);
  const availableDevices = devices.map((device) => ({
    ...device,
    icon: PAIR_DEVICES[device.type].icon ?? (
      <DeviceX className={cn('size-6')} />
    ),
  }));

  const [showPlayingInfo, setShowPlayingInfo] = useState(false);
  const [showDeviceList, setShowDeviceList] = useState(false);

  return (
    <div className={cn('fixed bottom-0 z-[999] w-full')}>
      <div
        className={cn(
          'font-cal flex justify-between bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-4 py-1 text-sm tracking-tight text-white',
        )}
      >
        {track?.songUrl ? (
          <>
            <Popover open={showPlayingInfo} onOpenChange={setShowPlayingInfo}>
              <PopoverTrigger
                asChild
                onMouseEnter={() => setShowPlayingInfo(true)}
                onMouseLeave={() => setShowPlayingInfo(false)}
                className={cn('relative')}
              >
                <div className={cn('flex items-center gap-2')}>
                  <AnimatedBars />
                  <span>Now playing: </span>
                  <div
                    className={cn(
                      'flex items-center gap-2 transition-all duration-200',
                    )}
                  >
                    <RenderIf isTrue={Boolean(track.albumImageUrl)}>
                      <Image
                        src={track.albumImageUrl as string}
                        alt={track.album as string}
                        className={cn('rounded-sm')}
                        width={16}
                        height={16}
                        unoptimized
                      />
                    </RenderIf>
                    <div
                      className={cn(
                        'flex gap-1',
                        'hover:cursor-pointer hover:underline',
                      )}
                      onClick={() => onOpenSongUrl?.(track.songUrl)}
                    >
                      <div className={cn('inline-flex')}>
                        <span>{track.artist}</span> - <span>{track.title}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent
                side="bottom"
                sideOffset={16}
                align="start"
                alignOffset={-4}
                className={cn(
                  'bg-card flex w-60 flex-col overflow-hidden rounded-lg p-0 shadow-lg',
                )}
              >
                <RenderIf isTrue={Boolean(track.albumImageUrl)}>
                  <Image
                    className={cn('rounded-t-lg')}
                    unoptimized
                    alt={track.album as string}
                    src={track.albumImageUrl as string}
                    width={256}
                    height={256}
                  />
                </RenderIf>
                <div className={cn('space-y-2 p-4 text-sm')}>
                  <div className={cn('space-y-1')}>
                    <div className={cn('text-spotify')}>{track.title}</div>
                    <div className={cn('text-muted-foreground')}>
                      {track.artist}
                    </div>
                  </div>
                  <div className={cn('text-muted-foreground flex gap-1')}>
                    <span>Album:</span>
                    <span>{track.album}</span>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover open={showDeviceList} onOpenChange={setShowDeviceList}>
              <PopoverTrigger
                asChild
                onMouseEnter={() => setShowDeviceList(true)}
                onMouseLeave={() => setShowDeviceList(false)}
                className={cn('relative')}
              >
                <div className={cn('flex items-center gap-1')}>
                  <Speaker className={cn('size-4')} />
                  <span>
                    Listening on{' '}
                    <span className={cn('font-medium')}>
                      {activeDevice?.name}
                    </span>
                  </span>
                </div>
              </PopoverTrigger>
              <PopoverContent
                side="bottom"
                sideOffset={16}
                align="end"
                alignOffset={-4}
                className={cn(
                  'bg-card flex w-max flex-col overflow-hidden rounded-lg shadow-lg',
                )}
              >
                {availableDevices.map((device, idx) => (
                  <div
                    key={`${device.id}-${idx}`}
                    className={cn(
                      'flex w-full items-center justify-between gap-3',
                    )}
                  >
                    <div className={cn('text-foreground')}>{device.icon}</div>
                    <div
                      className={cn(
                        'flex flex-grow flex-col pr-2 pl-0.5 text-sm',
                      )}
                    >
                      <span className={cn('text-foreground font-medium')}>
                        {device.name}
                      </span>
                      <span className={cn('text-muted-foreground')}>
                        {device.model}
                      </span>
                    </div>
                    <RenderIf isTrue={device.isActive}>
                      <Spotify className={cn('fill-spotify animate-pulse')} />
                    </RenderIf>
                  </div>
                ))}
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <div className={cn('flex items-center gap-2')}>
            <Spotify className={cn('fill-spotify size-4')} />
            Not Playing
          </div>
        )}
      </div>
    </div>
  );
};

export default NowPlayingBar;
