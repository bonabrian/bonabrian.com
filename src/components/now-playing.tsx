'use client'

import Image from 'next/image'

import cn from '@/lib/cn'

import { useNowPlaying } from '../hooks'
import { Spotify } from './icons'
import Link from './link'

const NowPlaying = () => {
  const { data } = useNowPlaying()

  return (
    <>
      {data?.isPlaying && (
        <div
          className={cn(
            'inline-flex items-center gap-1 shadow bg-slate-50 rounded-md p-4',
            'sm:gap-2',
            'dark:bg-gray-800',
          )}
        >
          <Link
            href={data.url ?? ''}
            title={data.title ?? ''}
            showExternalLinkIcon={false}
          >
            <div className={cn('flex gap-4')}>
              <div className={cn('relative w-12 h-12')}>
                <Image
                  src={data.image?.url ?? ''}
                  alt={data.title ?? ''}
                  fill
                  className={cn('rounded-full')}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className={cn('flex items-center justify-between gap-4')}>
                <div className={cn('flex flex-col w-48 gap-1.5')}>
                  <p
                    className={cn(
                      'flex font-normal text-sm text-gray-900',
                      'dark:text-slate-100',
                    )}
                  >
                    {data.artist}
                  </p>
                  <div
                    className={cn('flex items-center gap-1.5 text-[#1DB954]')}
                  >
                    <div className={cn('equalizer')}>
                      <span className={cn('bar bg-[#1DB954]')} />
                      <span className={cn('bar bg-[#1DB954]')} />
                      <span className={cn('bar bg-[#1DB954]')} />
                      <span className={cn('bar bg-[#1DB954]')} />
                      <span className={cn('bar bg-[#1DB954]')} />
                    </div>
                    <div className={cn('text-sm truncate font-bold')}>
                      {data.title}
                    </div>
                  </div>
                </div>
                <Spotify
                  className={cn('w-6 h-6 fill-[#1DB954] animate-spin')}
                />
              </div>
            </div>
          </Link>
        </div>
      )}
    </>
  )
}

export default NowPlaying
