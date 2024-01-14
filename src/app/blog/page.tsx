import { allPosts } from 'contentlayer/generated'
import type { Metadata } from 'next'

import PageHeader from '@/components/page-header'
import Posts from '@/components/posts'
import { Container } from '@/components/ui'
import { ROUTES } from '@/config/links'
import { seo } from '@/lib/meta'

const getPosts = () =>
  allPosts
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .filter((post) => post.published)

export const metadata: Metadata = seo({
  title: 'Blog',
  description:
    'Blog posts by Bona Brian Siagian. Here I share some thoughts, stories, information, and more about software development.',
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

const BlogPage = () => {
  const posts = getPosts()

  return (
    <>
      <PageHeader
        title="Blog"
        description="The place where I share my thoughts, ideas and experiences about software development."
      />
      <Container>
        <Posts posts={posts} />
      </Container>
    </>
  )
}

export default BlogPage
