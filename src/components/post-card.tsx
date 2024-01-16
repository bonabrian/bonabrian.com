'use client'

import type { Post } from 'contentlayer/generated'
import Image from 'next/image'
import { useMemo, useState } from 'react'

import { ROUTES } from '@/config/links'
import useView from '@/hooks/use-view'
import cn from '@/utils/cn'
import { formatDate } from '@/utils/date'

import { IncrementCounter, Link, Spinner } from './ui'

const PostCard = ({ post }: { post: Post }) => {
  const { _id, title, slug, date, excerpt, readingTime, image, imageMeta } =
    post
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

  const publishedAt = formatDate(date)
  const [isLoadingImage, setIsLoadingImage] = useState(true)

  return (
    <Link
      key={_id}
      href={`${ROUTES.blog}/${slug}`}
      className={cn(
        'group rounded-xl bg-card shadow-border transition-colors duration-200',
      )}
    >
      <div
        className={cn(
          'relative aspect-video w-full overflow-hidden bg-cover bg-no-repeat',
          isLoadingImage && 'animate-pulse',
        )}
      >
        <div className={cn('absolute h-full w-full')} />
        <Image
          src={image ?? ''}
          alt={title}
          fill
          className={cn(
            'rounded-xl object-cover transition duration-200 ease-in-out',
            isLoadingImage && 'scale-[1.01] blur-xl grayscale',
          )}
          sizes="(max-width: 768px) 100vw, 50vw"
          onLoad={() => setIsLoadingImage(false)}
          priority
          {...extraImageProps}
        />
      </div>
      <div
        className={cn(
          'flex items-center justify-between gap-2 px-4 pt-4 text-sm text-muted-foreground',
        )}
      >
        <time dateTime={publishedAt}>{publishedAt}</time>
        <div className={cn('flex gap-2')}>
          <div title="Estimated read time">{readingTime?.text}</div>
          <div>&middot;</div>
          <div className={cn('inline-flex')}>
            {isLoadViews ? (
              <Spinner />
            ) : (
              <span>
                <IncrementCounter to={views?.total ?? 0} /> views
              </span>
            )}
          </div>
        </div>
      </div>
      <div
        className={cn(
          'flex flex-col p-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5',
        )}
      >
        <h2
          className={cn(
            'font-cal text-lg font-bold text-card-foreground',
            'md:text-xl',
          )}
        >
          {title}
        </h2>
        <p className={cn('mt-2 text-muted-foreground')}>{excerpt}</p>
      </div>
    </Link>
  )
}

export default PostCard
