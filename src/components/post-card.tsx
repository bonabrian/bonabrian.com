'use client'

import type { Post } from 'contentlayer/generated'
import Image from 'next/image'
import { useMemo } from 'react'

import { useView } from '@/hooks'
import cn from '@/lib/cn'
import { routes } from '@/lib/constants'
import { formatDate } from '@/lib/utils'

import { Calendar, Clock, Eye } from './icons'
import IncrementCounter from './increment-counter'
import Link from './link'
import Spinner from './spinner'

const PostCard = ({ post }: { post: Post }) => {
  const { slug, title, date, excerpt, readingTime, image, imageMeta } = post

  const { views, loading: isLoadViews } = useView({ slug })

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
      className={cn(
        'flex flex-col items-stretch flex-nowrap rounded-md bg-card',
        'md:flex-row',
      )}
    >
      <Link
        href={`${routes.BLOG}/${slug}`}
        className={cn(
          'aspect-video w-full relative overflow-hidden bg-no-repeat rounded-l-md bg-cover basis-full',
          'md:basis-1/2',
        )}
      >
        <div className={cn('absolute w-full h-full')} />
        <Image
          src={image ?? ''}
          alt={title}
          fill
          className={cn(
            'object-cover hover:scale-105 transition duration-500 ease-in-out',
          )}
          sizes="(max-width: 768px) 100vw, 50vw"
          {...extraImageProps}
        />
      </Link>
      <div
        className={cn(
          'basis-full flex flex-col py-8 px-2 justify-between',
          'md:basis-1/2 md:p-8',
        )}
      >
        <div
          className={cn(
            'flex flex-col',
            "after:content-[''] after:bg-primary after:block after:w-32 after:h-px",
          )}
        >
          <Link href={`${routes.BLOG}/${slug}`}>
            <h2
              className={cn('font-semibold text-xl text-card-foreground mb-2')}
            >
              {title}
            </h2>
          </Link>
          <p className={cn('mb-4 text-muted-foreground')}>{excerpt}</p>
        </div>
        <div className={cn('flex flex-row text-xs text-secondary-foreground')}>
          <div
            className={cn(
              'flex items-center space-x-1',
              "after:content-['•'] after:inline-block after:align-middle after:mx-2 after:text-base",
            )}
          >
            <Calendar className={cn('w-4 h-4')} />
            <span title={publishedAt.raw}>{publishedAt.formatted}</span>
          </div>
          <div
            className={cn(
              'flex items-center space-x-1',
              "after:content-['•'] after:inline-block after:align-middle after:mx-2 after:text-base",
            )}
          >
            <Clock className={cn('w-4 h-4')} />
            <span title="Estimated read time">{readingTime?.text}</span>
          </div>
          <div className={cn('flex items-center gap-1')}>
            <Eye className={cn('w-4 h-4')} />
            {isLoadViews ? (
              <Spinner />
            ) : (
              <>
                <IncrementCounter to={views?.total ?? 0} /> views
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default PostCard
