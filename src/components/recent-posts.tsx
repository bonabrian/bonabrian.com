import { RiArrowRightSLine } from 'react-icons/ri'

import { routes } from '@/lib/constants'
import type { Post } from '@/types'

import CallToAction from './call-to-action'
import PostCard from './post-card'

interface RecentPostsProps {
  posts: Array<Post>
  title?: string
  subtitle?: string
  noDataText?: string
}

const RecentPosts = ({
  posts,
  title = 'Writing',
  subtitle = 'Recent Posts',
  noDataText = 'No recent posts.',
}: RecentPostsProps) => {
  return (
    <>
      <div className="flex flex-col">
        {title && (
          <span className="text-md md:text-lg font-medium text-primary-500 md:mb-2">
            {title}
          </span>
        )}
        {subtitle && (
          <h2 className="text-lg sm:text-xl md:text-2xl">{subtitle}</h2>
        )}
      </div>
      {posts.length ? (
        <>
          <div className="flex flex-col gap-8 py-8">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          <div className="flex justify-center items-center my-6">
            <CallToAction href={routes.BLOG}>
              All Posts <RiArrowRightSLine className="ml-1" />
            </CallToAction>
          </div>
        </>
      ) : (
        <p className="text-center">{noDataText}</p>
      )}
    </>
  )
}

export default RecentPosts
