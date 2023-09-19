'use client'

import type { Post } from 'contentlayer/generated'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

import { ROUTES } from '@/constants/links'
import { useMediaQuery, useView } from '@/hooks'
import cn from '@/lib/cn'
import { max } from '@/lib/screens'
import { formatDate } from '@/lib/utils'

import { IncrementCounter, Link, Spinner } from './common'
import { Clock, Eye } from './icons'

type LayoutOption = 'list' | 'grid'

interface PostCardProps {
  post: Post
  layout?: LayoutOption
}

const PostCard = ({ post, layout = 'list' }: PostCardProps) => {
  const isMaxMd = useMediaQuery(max('md'))
  const [viewOption, setViewOption] = useState<LayoutOption>(layout)

  const { slug, title, date, excerpt, readingTime, image, imageMeta } = post

  const { views, loading: isLoadViews } = useView({ slug })

  useEffect(() => {
    isMaxMd ? setViewOption('grid') : setViewOption(layout)
  }, [isMaxMd, layout])

  const isGridView = viewOption === 'grid'

  const extraImageProps = useMemo(() => {
    if (imageMeta?.blur64) {
      return { placeholder: 'blur', blurDataURL: imageMeta?.blur64 } as {
        placeholder: 'blur' | 'empty'
        blurDataURL?: string
      }
    }
    return {}
  }, [imageMeta])

  const publishedAt = formatDate(date)

  return (
    <article
      className={cn(
        'flex items-stretch flex-nowrap rounded-md bg-card',
        isGridView ? 'flex-col h-full' : 'flex-row',
        viewOption,
      )}
    >
      <Link
        href={`${ROUTES.blog}/${slug}`}
        className={cn(
          'aspect-video w-full relative overflow-hidden bg-no-repeat rounded-md bg-cover basis-1/2',
        )}
      >
        <div className={cn('absolute w-full h-full')} />
        <Image
          src={image ?? ''}
          alt={title}
          fill
          className={cn(
            'object-cover hover:scale-105 transition duration-500 ease-in-out rounded-t-md',
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
        <div className={cn('flex flex-col')}>
          <Link href={`${ROUTES.blog}/${slug}`}>
            <h2
              className={cn('font-semibold text-card-foreground mb-2 text-lg')}
            >
              {title}
            </h2>
          </Link>
          <p className={cn('mb-4 text-muted-foreground')}>{excerpt}</p>
        </div>
        <div className={cn('flex flex-row text-xs text-muted-foreground')}>
          <div
            className={cn(
              'flex items-center space-x-1',
              "after:content-[' '] after:inline-block after:align-middle after:mx-2 after:text-base",
            )}
          >
            <span title={publishedAt}>{publishedAt}</span>
          </div>
          <div
            className={cn(
              'flex items-center space-x-1',
              "after:content-[' '] after:inline-block after:align-middle after:mx-2 after:text-base",
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
