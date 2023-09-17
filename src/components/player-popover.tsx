import { Popover, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment } from 'react'

import cn from '@/lib/cn'
import type { NowPlaying } from '@/types/spotify'

interface PlayerPopoverProps {
  show: boolean
  playing: NowPlaying
}

const PlayerPopover = ({ show, playing }: PlayerPopoverProps) => {
  const { albumImageUrl, album, title, artist } = playing

  return (
    <Transition
      as={Fragment}
      show={show}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-1"
    >
      <Popover.Panel className={cn('absolute bottom-10 left-0 z-20 w-60')}>
        <div className="flex flex-col gap-5 p-4 overflow-hidden rounded-lg shadow-lg bg-card ring-1 ring-card ring-opacity-5">
          {albumImageUrl && (
            <Image
              className={cn('rounded-lg')}
              unoptimized
              alt={album}
              src={albumImageUrl}
              width={500}
              height={500}
            />
          )}
          <div className={cn('space-y-2')}>
            <div className={cn('space-y-1 font-plus-jakarta')}>
              <div className={cn('text-spotify')}>{title}</div>
              <div className={cn('text-muted-foreground text-sm')}>
                {artist}
              </div>
            </div>
            <div className={cn('flex gap-1 text-xs text-muted-foreground')}>
              <span>Album:</span>
              <span>{album}</span>
            </div>
          </div>
        </div>
      </Popover.Panel>
    </Transition>
  )
}

export default PlayerPopover
