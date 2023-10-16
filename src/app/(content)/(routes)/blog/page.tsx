import type { Post } from 'contentlayer/generated'
import { allPosts } from 'contentlayer/generated'
import type { Metadata } from 'next'

import PageHeader from '@/components/page-header'
import Posts from '@/components/posts'
import { ROUTES } from '@/data/app'
import { seo } from '@/data/meta'
import { fullURL } from '@/data/meta/builder'

const posts = allPosts
  .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
  .filter((post: Post) => post.published)

export const metadata: Metadata = seo({
  metadataBase: fullURL(),
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
  url: ROUTES.blog,
})

const BlogPage = async () => {
  return (
    <>
      <PageHeader
        title="Blog"
        description="The place where I share my thoughts, ideas and experiences about software development."
      />

      <div id="content">
        <Posts posts={posts} />
      </div>
    </>
  )
}

export default BlogPage
