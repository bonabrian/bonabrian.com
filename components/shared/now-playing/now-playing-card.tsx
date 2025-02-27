import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn, trim } from '@/lib/utils';
import type { NowPlaying } from '@/types/spotify';

import AnimatedBars from '../animated-bars';
import { Spotify } from '../icons';
import RenderIf from '../render-if';

const NowPlayingCard = ({
  track,
  onOpenSongUrl,
  isExpanded = false,
}: {
  track?: NowPlaying;
  onOpenSongUrl?: (url?: string) => void;
  isExpanded?: boolean;
}) => {
  const [expanded, setExpanded] = useState(isExpanded);

  if (!track?.songUrl) return null;

  const trimmedSongTitle = trim(track.title, 40);
  const trimmedSongArtist = trim(track.artist);

  return (
    <div
      className={cn(
        'fixed bottom-0 z-[999] w-full',
        !expanded && 'flex justify-end',
      )}
    >
      {!expanded ? (
        <Button
          className={cn(
            'text-spotify cursor-pointer rounded-full bg-transparent transition-all duration-200',
            'hover:text-spotify hover:bg-transparent',
          )}
          onClick={() => setExpanded(!expanded)}
          size="icon"
          variant="ghost"
        >
          <Spotify className={cn('animate-pulse')} />
        </Button>
      ) : (
        <div
          className={cn(
            'flex items-center justify-between rounded-t-lg bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-2',
          )}
        >
          <div className={cn('flex items-center gap-3')}>
            <RenderIf isTrue={Boolean(track.albumImageUrl)}>
              <Image
                className={cn('rounded-lg')}
                unoptimized
                alt={track.album as string}
                src={track.albumImageUrl as string}
                width={60}
                height={60}
              />
            </RenderIf>
            <div
              className={cn(
                'font-cal flex flex-col text-white',
                'hover:cursor-pointer hover:underline',
              )}
              onClick={() => onOpenSongUrl?.(track.songUrl)}
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
          <Button
            size="icon"
            variant="ghost"
            className={cn('bg-transparent text-white')}
            onClick={() => setExpanded(!expanded)}
          >
            <ChevronDown />
          </Button>
        </div>
      )}
    </div>
  );
};

export default NowPlayingCard;
