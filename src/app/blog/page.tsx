import type { Metadata } from 'next'
import { Suspense } from 'react'

import PostList from '@/components/post-list'
import { getPosts } from '@/lib/contentlayer'
import { getMetadata } from '@/lib/metadata'

const posts = getPosts([
  'title',
  'date',
  'slug',
  'excerpt',
  'tags',
  'readingTime',
  'draft',
  'image',
  'imageMeta',
])

export const metadata: Metadata = getMetadata({
  title: 'Blog',
  description:
    'Blog posts by Bona Brian Siagian. Here I share some thoughts, stories, information, and more about software development',
  keywords: [
    'blog',
    'story',
    'articles',
    'moments',
    'contents',
    'thoughts',
    'tech',
    'software',
    'development',
  ],
})

const BlogPage = async () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostList
        title="Blog"
        description="The place where I share my thoughts, ideas and experiences about software development."
        posts={posts}
      />
    </Suspense>
  )
}

export default BlogPage