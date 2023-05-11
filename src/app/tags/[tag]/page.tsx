import { allPosts } from 'contentlayer/generated'
import { Suspense } from 'react'

import PostList from '@/components/post-list'
import { getMetadata } from '@/lib/metadata'
import { kebabCase } from '@/lib/utils'

export const generateMetadata = async ({
  params,
}: {
  params: { tag: string }
}) => {
  return getMetadata({
    title: params.tag,
    description: `${params.tag} tags`,
    keywords: [
      'blog',
      'articles',
      'contents',
      'tags',
      'tag',
      'hashtags',
      'keyword',
    ],
  })
}

const TagPage = ({ params }: { params: { tag: string } }) => {
  const tag = params.tag
  const posts = allPosts.filter((post) =>
    post.tags?.map((t) => kebabCase(t)?.includes(tag)),
  )

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostList title={`#${tag}`} posts={posts} />
    </Suspense>
  )
}

export default TagPage
