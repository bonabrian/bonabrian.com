'use client'

import type { Post } from 'contentlayer/generated'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

import useView from '@/app/(content)/hooks/use-view'
import { ROUTES } from '@/data/app'
import { useMediaQuery } from '@/hooks'
import cn from '@/lib/cn'
import { max } from '@/lib/screens'
import { formatDate } from '@/lib/utils'

import { Clock, Eye } from './icons'
import { IncrementCounter, Link, Spinner } from './ui'

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
  const [isLoadingImage, setIsLoadingImage] = useState(true)

  return (
    <article
      className={cn(
        'flex flex-nowrap items-stretch rounded-md bg-card',
        isGridView ? 'h-full flex-col' : 'flex-row',
        viewOption,
      )}
    >
      <Link
        href={`${ROUTES.blog}/${slug}`}
        className={cn(
          'relative aspect-video w-full basis-1/2 overflow-hidden rounded-md bg-cover bg-no-repeat',
          isLoadingImage && 'animate-pulse',
        )}
      >
        <div className={cn('absolute h-full w-full')} />
        <Image
          src={image ?? ''}
          alt={title}
          fill
          className={cn(
            'rounded-t-md object-cover transition duration-500 ease-in-out hover:scale-105',
            isLoadingImage && 'scale-[1.01] blur-xl grayscale',
          )}
          sizes="(max-width: 768px) 100vw, 50vw"
          onLoad={() => setIsLoadingImage(false)}
          priority
          {...extraImageProps}
        />
      </Link>
      <div
        className={cn(
          'flex basis-full flex-col justify-between px-4 py-8',
          'md:basis-1/2 md:p-8',
        )}
      >
        <div className={cn('flex flex-col')}>
          <Link href={`${ROUTES.blog}/${slug}`}>
            <h2
              className={cn('mb-2 text-lg font-semibold text-card-foreground')}
            >
              {title}
            </h2>
          </Link>
          <p className={cn('mb-4 text-muted-foreground')}>{excerpt}</p>
        </div>
        <div className={cn('flex flex-row text-sm text-muted-foreground')}>
          <div
            className={cn(
              'flex items-center space-x-1',
              "after:content-[' '] after:mx-2 after:inline-block after:align-middle after:text-base",
            )}
          >
            <span title={publishedAt}>{publishedAt}</span>
          </div>
          <div
            className={cn(
              'flex items-center space-x-1',
              "after:content-[' '] after:mx-2 after:inline-block after:align-middle after:text-base",
            )}
          >
            <Clock className={cn('h-4 w-4')} />
            <span title="Estimated read time">{readingTime?.text}</span>
          </div>
          <div className={cn('flex items-center gap-1')}>
            <Eye className={cn('h-4 w-4')} />
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
