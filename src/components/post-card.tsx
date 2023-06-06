'use client'

import cx from 'classnames'
import type { Post } from 'contentlayer/generated'
import Image from 'next/image'
import { useMemo } from 'react'
import { RiCalendarLine, RiEyeLine, RiTimeLine } from 'react-icons/ri'

import { useRequest } from '@/hooks'
import { routes } from '@/lib/constants'
import { formatDate } from '@/lib/utils'

import Link from './link'
import Spinner from './spinner'

const PostCard = ({ post }: { post: Post }) => {
  const { slug, title, date, excerpt, readingTime, image, imageMeta } = post

  const { data: views, loading: isLoadViews } = useRequest<{ total?: string }>(
    `/api/views/${slug}`,
  )

  const extraImageProps = useMemo(() => {
    if (imageMeta?.blur64) {
      return { placeholder: 'blur', blurDataURL: imageMeta?.blur64 } as {
        placeholder: 'blur' | 'empty'
        blurDataURL?: string
      }
    }
    return {}
  }, [imageMeta])

  const publishedAt = formatDate({ timestamp: date, month: 'short' })

  return (
    <article
      className={cx(
        'flex flex-col items-stretch flex-nowrap rounded-lg',
        'md:flex-row',
        'dark:shadow-gray-800/40',
      )}
    >
      <Link
        href={`${routes.BLOG}/${slug}`}
        className={cx(
          'aspect-video w-full relative overflow-hidden bg-no-repeat bg-cover basis-full rounded-lg',
          'md:basis-1/2',
        )}
      >
        <div className={cx('absolute w-full h-full')} />
        <Image
          src={image ?? ''}
          alt={title}
          fill
          className={cx(
            'object-cover hover:scale-105 transition duration-500 ease-in-out rounded-t-lg',
          )}
          sizes="(max-width: 768px) 100vw, 50vw"
          {...extraImageProps}
        />
      </Link>
      <div
        className={cx(
          'basis-full flex flex-col py-8 px-2',
          'md:basis-1/2 md:p-8',
        )}
      >
        <Link href={`${routes.BLOG}/${slug}`}>
          <h2
            className={cx(
              'font-semibold text-xl text-gray-700 mb-2',
              'dark:text-slate-50',
            )}
          >
            {title}
          </h2>
        </Link>
        <p className={cx('mb-4 text-gray-600', 'dark:text-slate-200')}>
          {excerpt}
        </p>
        <div
          className={cx(
            "before:content-[''] before:block before:w-32 before:h-px before:bg-primary-200 before:mb-4",
          )}
        >
          <div
            className={cx(
              'flex flex-row text-xs text-gray-900/60',
              'dark:text-slate-100/70',
            )}
          >
            <div
              className={cx(
                'flex items-center space-x-1',
                "after:content-['•'] after:inline-block after:align-middle after:mx-2 after:text-base",
              )}
            >
              <RiCalendarLine />
              <span title={publishedAt.raw}>{publishedAt.formatted}</span>
            </div>
            <div
              className={cx(
                'flex items-center space-x-1',
                "after:content-['•'] after:inline-block after:align-middle after:mx-2 after:text-base",
              )}
            >
              <RiTimeLine />
              <span title="Estimated read time">{readingTime?.text}</span>
            </div>
            <div className={cx('flex items-center space-x-1')}>
              <RiEyeLine />
              {isLoadViews ? (
                <Spinner />
              ) : (
                <span>{`${views?.total}`} views</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default PostCard
