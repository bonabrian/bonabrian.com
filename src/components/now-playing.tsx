import Image from 'next/image'
import { SiSpotify } from 'react-icons/si'

import { useNowPlaying } from '../hooks'
import Link from './link'

const NowPlaying = () => {
  const { data } = useNowPlaying()
  console.log(data)

  return (
    <div className="flex items-center gap-1 sm:gap-2 mb-4">
      <div className="flex max-w-full truncate">
        {data && data.isPlaying ? (
          <Link
            className="text-sm truncate max-w-max hover:text-spotify"
            href={data.url || ''}
            title={data.title || ''}
            showExternalLinkIcon={false}
          >
            <div className="flex gap-4 pr-4 dark:bg-black/10 rounded-md">
              <div className="relative w-16 h-16">
                <Image
                  src={data.image?.url || ''}
                  alt={data.title || ''}
                  fill
                  className="rounded-md"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="font-normal">{data.artist}</div>
                  <div className="font-semibold text-[#1ED760]">
                    {data.title}
                  </div>
                </div>
                <div>
                  <SiSpotify
                    fill="#1ED760"
                    className={`${data?.isPlaying ? 'animate-spin' : ''}`}
                    size={24}
                  />
                </div>
              </div>
            </div>
          </Link>
        ) : (
          <div className="flex items-center gap-2">
            <SiSpotify fill="#1ED760" size={24} />
            <p className="text-sm text-gray-900/50 dark:text-white/60">
              Not playing...
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default NowPlaying
