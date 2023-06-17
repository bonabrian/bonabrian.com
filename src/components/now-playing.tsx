'use client'

import cx from 'classnames'
import Image from 'next/image'

import { useNowPlaying } from '../hooks'
import { Spotify } from './icons'
import Link from './link'

const NowPlaying = () => {
  const { data } = useNowPlaying()

  return (
    <>
      {data?.isPlaying && (
        <div
          className={cx(
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
            <div className={cx('flex gap-4')}>
              <div className={cx('relative w-12 h-12')}>
                <Image
                  src={data.image?.url ?? ''}
                  alt={data.title ?? ''}
                  fill
                  className={cx('rounded-full')}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className={cx('flex items-center justify-between gap-4')}>
                <div className={cx('flex flex-col w-48 gap-1.5')}>
                  <p
                    className={cx(
                      'flex font-normal text-sm text-gray-900',
                      'dark:text-slate-100',
                    )}
                  >
                    {data.artist}
                  </p>
                  <div
                    className={cx('flex items-center gap-1.5 text-[#1DB954]')}
                  >
                    <div className={cx('equalizer')}>
                      <span className={cx('bar bg-[#1DB954]')} />
                      <span className={cx('bar bg-[#1DB954]')} />
                      <span className={cx('bar bg-[#1DB954]')} />
                      <span className={cx('bar bg-[#1DB954]')} />
                      <span className={cx('bar bg-[#1DB954]')} />
                    </div>
                    <div className={cx('text-sm truncate font-bold')}>
                      {data.title}
                    </div>
                  </div>
                </div>
                <Spotify
                  className={cx('w-6 h-6 fill-[#1DB954] animate-spin')}
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
