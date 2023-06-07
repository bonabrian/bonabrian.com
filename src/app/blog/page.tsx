import type { Post } from 'contentlayer/generated'
import { allPosts } from 'contentlayer/generated'
import type { Metadata } from 'next'
import { Suspense } from 'react'

import PageHeader from '@/components/page-header'
import PostList from '@/components/post-list'
import { getMetadata } from '@/lib/metadata'

const posts = allPosts
  .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
  .filter((post: Post) => post.published)

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
      <PageHeader
        title="Blog"
        description="The place where I share my thoughts, ideas and experiences about software development."
      />

      <div id="content">
        <PostList posts={posts} />
      </div>
    </Suspense>
  )
}

export default BlogPage
