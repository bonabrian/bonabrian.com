import { motion } from 'framer-motion'
import Image from 'next/image'
import { useMemo } from 'react'
import { RiCalendarLine, RiEyeLine, RiTimeLine } from 'react-icons/ri'

import { routePaths } from '@/data'
import { useRequest } from '@/hooks'
import { formatDate, kebabCase } from '@/lib/utils'
import type { Post } from '@/types'

import Link from './Link'
import Spinner from './Spinner'

interface PostCardProps {
  post: Post
}

const PostTag = ({ tag }: { tag: string }) => {
  return (
    <Link
      href={`/tags/${kebabCase(tag)}`}
      className="rounded-2xl font-semibold uppercase px-3 py-1 tracking-tighter text-white bg-pink-500 text-xs"
    >
      {tag}
    </Link>
  )
}

const PostCard = ({ post }: PostCardProps) => {
  const { slug, title, date, excerpt, tags, readingTime, image, imageMeta } =
    post

  const { data: views, loading: isLoadViews } = useRequest<{ total?: string }>(
    `api/views/${slug}`,
  )

  const extraImageProps = useMemo(() => {
    if (imageMeta && imageMeta.blur64) {
      return { placeholder: 'blur', blurDataURL: imageMeta?.blur64 } as {
        placeholder: 'blur' | 'empty'
        blurDataURL?: string
      }
    }
    return {}
  }, [imageMeta])

  const publishedAt = formatDate({ timestamp: date, month: 'short' })

  return (
    <motion.article
      layout
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="flex flex-col sm:flex-row items-stretch flex-nowrap shadow-sm dark:shadow-gray-800/40"
    >
      <Link
        href={`${routePaths.BLOG}/${slug}`}
        className="aspect-video w-full relative overflow-hidden bg-no-repeat bg-cover basis-full sm:basis-1/2"
      >
        <div className="absolute w-full h-full" />
        <Image
          src={image || ''}
          alt={title}
          fill
          className="object-cover hover:scale-110 transition duration-500 ease-in-out"
          sizes="(max-width: 768px) 100vw, 50vw"
          {...extraImageProps}
        />
      </Link>
      <div className="basis-full sm:basis-1/2 flex flex-col p-8">
        {tags && (
          <div className="flex flex-wrap gap-4 mb-2">
            {tags?.map((tag) => (
              <PostTag key={tag} tag={tag} />
            ))}
          </div>
        )}
        <Link
          href={`${routePaths.BLOG}/${slug}`}
          className="text-md sm:text-lg md:text-xl font-semibold tracking-tighter mb-5"
        >
          {title}
        </Link>
        <p className="text-base text-gray-900/50 dark:text-white/60 mb-5">
          {excerpt}
        </p>
        <div className="before:content-[''] before:block before:w-16 before:h-px before:bg-primary-500 before:mb-4">
          <div className="flex flex-row text-xs text-gray-900/50 dark:text-white/60">
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
    </motion.article>
  )
}

export default PostCard
