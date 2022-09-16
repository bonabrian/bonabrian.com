import Image from 'next/image'
import { useMemo } from 'react'
import { RiCalendarLine, RiEyeLine, RiTimeLine } from 'react-icons/ri'

import { useRequest } from '@/hooks'
import { formatDate } from '@/utils'

import Link from '../Link'
import LoadingSpinner from '../LoadingSpinner'
import Tag from '../Tag'
import type { PostCardProps } from './types'

const PostCard = ({ post }: PostCardProps) => {
  const { slug, title, date, excerpt, tags, readingTime, hero, heroMeta } = post
  const { data: views, loading: isLoadViews } = useRequest<{ total?: string }>(
    `api/views/${slug}`,
  )

  const extraHeroProps = useMemo(() => {
    if (heroMeta && heroMeta.blur64) {
      return { placeholder: 'blur', blurDataURL: heroMeta?.blur64 } as {
        placeholder: 'blur' | 'empty'
        blurDataURL?: string
      }
    }
    return {}
  }, [heroMeta])

  return (
    <article className='flex flex-col sm:flex-row sm:gap-4 hover:bg-gray-100 dark:hover:bg-gray-900 hover:-translate-y-2 transform duration-300 sm:px-4 py-4 sm:-mx-4 rounded-lg'>
      <div className='flex items-start max-w-full sm:max-w-[10rem]'>
        {hero && (
          <Link href={`/blog/${slug}`}>
            <Image
              src={hero || ''}
              alt={`Cover image for article "${title}"`}
              width={heroMeta?.size?.width || 144}
              height={heroMeta?.size?.height || 72}
              {...extraHeroProps}
              className='rounded-lg'
            />
          </Link>
        )}
      </div>
      <div className='flex flex-col'>
        {tags && (
          <div className='flex flex-wrap space-x-2 my-2 sm:mt-0'>
            {tags?.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>
        )}
        <Link href={`/blog/${slug}`}>
          <h3 className='text-lg md:text-xl font-medium'>{title}</h3>
          <p className='text-gray-600 dark:text-gray-300'>{excerpt}</p>
        </Link>
        <div className='flex items-center flex-wrap text-sm mt-3 text-gray-400 dark:text-gray-500 w-full'>
          <span className='flex items-center space-x-1'>
            <RiCalendarLine />
            <span>{formatDate(date, { month: 'short' })}</span>
          </span>
          <span className='mx-2'>•</span>
          <span className='flex items-center space-x-1'>
            <RiTimeLine />
            <span title='Estimated read time'>{readingTime?.text}</span>
          </span>
          <span className='mx-2'>•</span>
          <span className='flex items-center space-x-1'>
            <RiEyeLine />
            <span>
              {isLoadViews ? (
                <LoadingSpinner />
              ) : (
                <span>{`${views?.total}`} views</span>
              )}
            </span>
          </span>
        </div>
      </div>
    </article>
  )
}

export default PostCard
