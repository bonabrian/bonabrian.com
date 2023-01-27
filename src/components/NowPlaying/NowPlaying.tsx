import { SiSpotify } from 'react-icons/si'

import { useNowPlaying } from '@/hooks'

import Link from '../Link'

const NowPlaying = () => {
  const { data } = useNowPlaying()

  return (
    <div className="flex items-center w-full gap-1 mb-2 sm:gap-2">
      <SiSpotify
        fill="#1ED760"
        className={`${data?.isPlaying ? 'animate-spin' : ''}`}
      />
      <div className="flex max-w-full truncate">
        {data && data.isPlaying ? (
          <Link
            className="text-sm truncate max-w-max hover:text-spotify"
            href={data.url || ''}
            title={data.title || ''}
            showExternalLinkIcon={false}
          >
            <div>
              Listen to <span className="font-semibold">{data.title}</span> by{' '}
              <span className="font-semibold">{data.artist}</span>
            </div>
          </Link>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Not playing
          </p>
        )}
      </div>
    </div>
  )
}

export default NowPlaying
