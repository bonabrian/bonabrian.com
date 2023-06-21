import { allPosts, type Post } from 'contentlayer/generated'

import cn from '@/lib/cn'
import { routes } from '@/lib/constants'

import Container from './container'
import { ChevronRight } from './icons'
import Link from './link'
import PostCard from './post-card'

const getRecentPosts = (maxDisplay: number = 2) =>
  allPosts
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .filter((post: Post) => post.published)
    ?.slice(0, maxDisplay)

const RecentPosts = () => {
  const posts = getRecentPosts()

  return (
    <div className={cn('mb-12')}>
      <Container>
        <h2 className={cn('text-primary-500 font-bold mb-2')}>Writing</h2>
        <p
          className={cn(
            'mb-4 font-bold text-gray-700 text-xl',
            'md:text-2xl',
            'dark:text-slate-50',
          )}
        >
          Recent Posts.
        </p>
        {posts.length ? (
          <>
            <div className={cn('flex flex-col gap-8 my-4', 'md:my-8')}>
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
            <div className={cn('flex justify-center items-center my-4')}>
              <Link
                href={routes.BLOG}
                className={cn('button button--rounded button--shadow gap-1')}
              >
                See All Posts <ChevronRight />
              </Link>
            </div>
          </>
        ) : (
          <p className={cn('text-center my-4', 'md:my-8')}>No recent posts.</p>
        )}
      </Container>
    </div>
  )
}

export default RecentPosts
