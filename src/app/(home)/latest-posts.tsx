'use client'

import { allPosts } from 'contentlayer/generated'
import { m, useInView } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'

import { ChevronRight } from '@/components/icons'
import PostCard from '@/components/post-card'
import { Button, EmptyState } from '@/components/ui'
import { ROUTES } from '@/config/links'
import cn from '@/utils/cn'

const MAX_DISPLAY = 2

const getLatestPosts = (maxDisplay: number = MAX_DISPLAY) =>
  allPosts
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .filter((post) => post.published)
    ?.slice(0, maxDisplay)

const variants = {
  initial: {
    y: 40,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
}

const LatestPosts = () => {
  const postsRef = useRef<HTMLDivElement>(null)
  const posts = getLatestPosts()
  const isInView = useInView(postsRef, { once: true, margin: '-100px' })

  return (
    <m.div
      initial="initial"
      animate={isInView ? 'animate' : 'initial'}
      variants={variants}
      ref={postsRef}
      transition={{ duration: 0.5 }}
      className={cn('will-change-[transform, opacity]')}
    >
      <m.div
        className={cn('mb-4 flex flex-col')}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className={cn('font-cal font-bold text-primary')}>Writing</h2>
        <p
          className={cn(
            'font-cal text-xl text-secondary-foreground',
            'md:text-2xl',
          )}
        >
          Latest Posts
        </p>
      </m.div>
      {posts.length ? (
        <>
          <m.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={cn(
              'my-4 grid auto-cols-fr grid-cols-1 gap-8',
              'md:my-8 md:grid-cols-2',
            )}
          >
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </m.div>
          <div className={cn('my-4 flex items-center justify-center')}>
            <Link href={ROUTES.blog}>
              <Button variant="outline">
                See All Posts <ChevronRight />
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <EmptyState message="The posts are playing hide and seek – we just can't find them!" />
      )}
    </m.div>
  )
}

export default LatestPosts
