'use client';

import { MonitorSpeakerIcon, SpeakerIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Spotify } from '@/components/shared/icons';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { pairDevices } from '../pair-devices';
import type { Device, NowPlaying } from '../types';
import Equalizer from './equalizer';

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
    icon: pairDevices[device.type].icon ?? (
      <MonitorSpeakerIcon className="size-6" />
    ),
  }));

  const [showPlayingInfo, setShowPlayingInfo] = useState(false);
  const [showDeviceList, setShowDeviceList] = useState(false);

  return (
    <div className="fixed bottom-0 z-[999] w-full">
      <div className="font-cal via-primary flex justify-between bg-gradient-to-r from-purple-400 to-indigo-400 px-4 py-1 text-sm tracking-tight text-white">
        {track?.songUrl ? (
          <>
            <Popover open={showPlayingInfo} onOpenChange={setShowPlayingInfo}>
              <PopoverTrigger
                asChild
                onMouseEnter={() => setShowPlayingInfo(true)}
                onMouseLeave={() => setShowPlayingInfo(false)}
                className="relative"
              >
                <div className="flex items-center gap-2">
                  <Equalizer />
                  <span>Now playing: </span>
                  <div className="flex items-center gap-2 transition-all duration-200">
                    {track.albumImageUrl && (
                      <Image
                        src={track.albumImageUrl}
                        alt={track.album as string}
                        width={16}
                        height={16}
                        unoptimized
                        className="rounded-sm"
                      />
                    )}
                    <div
                      className="flex gap-1 hover:cursor-pointer hover:underline"
                      onClick={() => onOpenSongUrl?.(track.songUrl)}
                    >
                      <div className="inline-flex">
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
                className="bg-card flex w-60 flex-col overflow-hidden rounded-lg p-0 shadow-lg"
              >
                {track.albumImageUrl && (
                  <Image
                    src={track.albumImageUrl}
                    alt={track.album as string}
                    width={256}
                    height={256}
                    unoptimized
                    className="rounded-md"
                  />
                )}
                <div className="space-y-2 p-4 text-sm">
                  <div className="space-y-1">
                    <div className="text-spotify font-cal">{track.title}</div>
                    <div className="text-muted-foreground">{track.artist}</div>
                  </div>
                  <div className="text-muted-foreground flex gap-1">
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
                className="relative"
              >
                <div className="flex items-center gap-1">
                  <SpeakerIcon className="size-4" />
                  <span>
                    Listening on{' '}
                    <span className="font-medium">{activeDevice?.name}</span>
                  </span>
                </div>
              </PopoverTrigger>
              <PopoverContent
                side="bottom"
                sideOffset={16}
                align="end"
                alignOffset={-4}
                className="bg-card flex w-max flex-col overflow-hidden rounded-lg shadow-lg"
              >
                {availableDevices.map((device) => (
                  <div
                    key={device.id}
                    className="flex w-full items-center justify-between gap-3"
                  >
                    <div className="text-foreground">{device.icon}</div>
                    <div className="flex grow flex-col pr-2 pl-0.5 text-sm">
                      <span className="text-foreground font-cal">
                        {device.name}
                      </span>
                      <span className="text-muted-foreground">
                        {device.model}
                      </span>
                    </div>
                    {device.isActive && (
                      <Spotify className="fill-spotify animate-pulse" />
                    )}
                  </div>
                ))}
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Spotify className="fill-spotify size-4" />
            Not playing
          </div>
        )}
      </div>
    </div>
  );
};

export default NowPlayingBar;
