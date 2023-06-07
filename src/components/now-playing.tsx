'use client'

import cx from 'classnames'
import Image from 'next/image'

import { useNowPlaying } from '../hooks'
import Link from './link'

const NowPlaying = () => {
  const { data } = useNowPlaying()

  return (
    <>
      {data?.isPlaying && (
        <div
          className={cx(
            'inline-flex items-center gap-1 shadow-sm bg-gray-50 rounded-md p-4',
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
                <div className={cx('flex flex-col w-40')}>
                  <p
                    className={cx(
                      'flex font-normal text-xs text-gray-900/60',
                      'dark:text-slate-100/70',
                    )}
                  >
                    {data.artist}
                  </p>
                  <p className={cx('font-semibold text-sm truncate')}>
                    {data.title}
                  </p>
                </div>
                <div className={cx('equalizer')}>
                  <span className="bar" />
                  <span className="bar" />
                  <span className="bar" />
                  <span className="bar" />
                  <span className="bar" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}
    </>
  )
}

export default NowPlaying
