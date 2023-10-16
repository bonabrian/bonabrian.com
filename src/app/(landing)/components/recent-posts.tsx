import { allPosts, type Post } from 'contentlayer/generated'

import { ChevronRight } from '@/components/icons'
import PostCard from '@/components/post-card'
import { Button, EmptyState, Link } from '@/components/ui'
import { ROUTES } from '@/constants/links'
import cn from '@/lib/cn'

import Section from './section'

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
          <div className={cn('my-4 flex flex-col gap-8', 'md:my-8')}>
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          <div className={cn('my-4 flex items-center justify-center')}>
            <Link href={ROUTES.blog}>
              <Button variant="outline">
                See All Posts <ChevronRight />
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <EmptyState message="No recent posts." />
      )}
    </Section>
  )
}

export default RecentPosts
