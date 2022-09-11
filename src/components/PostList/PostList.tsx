import Image from 'next/image'
import { useMemo } from 'react'
import { RiCalendarLine, RiEyeLine, RiTimeLine } from 'react-icons/ri'

import { useRequest } from '@/hooks'
import { formatDate } from '@/utils'

import Link from '../Link'
import LoadingSpinner from '../LoadingSpinner'
import Tag from '../Tag'
import type { PostListProps } from './types'

const PostList = ({ post }: PostListProps) => {
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
    <div className='relative overflow-hidden hover:scale-105 hover:rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 px-4 py-4 -mr-4 -mx-4 transition ease-in-out duration-200'>
      <article className='flex flex-col sm:flex-row gap-3'>
        <div className='flex items-center max-w-full sm:max-w-article-thumb'>
          {hero && (
            <Image
              src={hero || ''}
              alt={`Cover image for article "${title}"`}
              width={heroMeta?.size?.width || 144}
              height={heroMeta?.size?.height || 72}
              {...extraHeroProps}
              className='rounded-xl max-w-xs'
            />
          )}
        </div>
        <div className='flex flex-col'>
          {tags && (
            <div className='flex flex-wrap space-x-2 my-3 sm:mt-0'>
              {tags?.map((tag) => (
                <Tag key={tag} text={tag} />
              ))}
            </div>
          )}
          <Link href={`/blog/${slug}`}>
            <h3 className='text-lg font-medium leading-8 tracking-tight'>
              {title}
            </h3>
          </Link>
          <p className='text-gray-500 dark:text-gray-400'>{excerpt}</p>
          <div className='flex items-center flex-wrap text-sm mt-2 text-gray-500 dark:text-gray-400 w-full justify-between'>
            <span className='flex items-center space-x-1'>
              <RiCalendarLine />
              <span>{formatDate(date, { month: 'short' })}</span>
            </span>
            <span className='flex items-center space-x-1'>
              <RiTimeLine />
              <span>{readingTime?.text}</span>
            </span>
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
    </div>
  )
}

export default PostList
