import { allPosts } from 'contentlayer/generated'

import PageHeader from '@/components/page-header'
import Posts from '@/components/posts'
import { Container } from '@/components/ui'

const getPosts = () =>
  allPosts
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .filter((post) => post.published)

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
