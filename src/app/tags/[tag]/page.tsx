import { allPosts } from 'contentlayer/generated'

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
  const posts = allPosts.filter(
    (post) =>
      post.tags?.map((t) => kebabCase(t)?.includes(tag) && post.published),
  )

  return <PostList posts={posts} />
}

export default TagPage
