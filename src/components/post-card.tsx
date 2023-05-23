'use client'

import type { Post } from 'contentlayer/generated'
import { m } from 'framer-motion'
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
    <m.article
      layout
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="flex flex-col sm:flex-row items-stretch flex-nowrap shadow-sm dark:shadow-gray-800/40 rounded-lg"
    >
      <Link
        href={`${routes.BLOG}/${slug}`}
        className="aspect-video w-full relative overflow-hidden bg-no-repeat bg-cover basis-full sm:basis-1/2 rounded-lg"
      >
        <div className="absolute w-full h-full" />
        <Image
          src={image ?? ''}
          alt={title}
          fill
          className="object-cover hover:scale-105 transition duration-500 ease-in-out rounded-t-lg"
          sizes="(max-width: 768px) 100vw, 50vw"
          {...extraImageProps}
        />
      </Link>
      <div className="basis-full sm:basis-1/2 flex flex-col p-8">
        <Link
          href={`${routes.BLOG}/${slug}`}
          className="text-md sm:text-lg md:text-xl font-semibold tracking-tighter mb-5"
        >
          {title}
        </Link>
        <p className="text-base text-gray-900/50 dark:text-white/60 mb-5">
          {excerpt}
        </p>
        <div className="before:content-[''] before:block before:w-16 before:h-px before:bg-primary-500 before:mb-4">
          <div className="flex flex-row text-xs md:text-sm text-gray-900/50 dark:text-white/60">
            <div className="flex items-center space-x-1 after:content-['•'] after:inline-block after:align-middle after:mx-2 after:text-base">
              <RiCalendarLine />
              <span title={publishedAt.raw}>{publishedAt.formatted}</span>
            </div>
            <div className="flex items-center space-x-1 after:content-['•'] after:inline-block after:align-middle after:mx-2 after:text-base">
              <RiTimeLine />
              <span title="Estimated read time">{readingTime?.text}</span>
            </div>
            <div className="flex items-center space-x-1">
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
    </m.article>
  )
}

export default PostCard
