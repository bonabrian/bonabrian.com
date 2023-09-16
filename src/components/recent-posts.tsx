import { allPosts, type Post } from 'contentlayer/generated'

import cn from '@/lib/cn'
import { routes } from '@/lib/constants'

import { ChevronRight } from './icons'
import Link from './link'
import PostCard from './post-card'
import { Button, Section } from './ui'

const getRecentPosts = (maxDisplay: number = 2) =>
  allPosts
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .filter((post: Post) => post.published)
    ?.slice(0, maxDisplay)

const RecentPosts = () => {
  const posts = getRecentPosts()

  return (
    <Section title="Writing" subtitle="Recent Posts.">
      {posts.length ? (
        <>
          <div className={cn('flex flex-col gap-8 my-4', 'md:my-8')}>
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          <div className={cn('flex justify-center items-center my-4')}>
            <Link href={routes.BLOG}>
              <Button variant="outline">
                See All Posts <ChevronRight />
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <p className={cn('text-center my-4', 'md:my-8')}>No recent posts.</p>
      )}
    </Section>
  )
}

export default RecentPosts
