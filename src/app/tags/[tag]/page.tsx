import { allPosts } from 'contentlayer/generated'

import Posts from '@/app/blog/posts'
import PageHeader from '@/components/page-header'
import { getMetadata } from '@/lib/metadata'
import { kebabCase } from '@/lib/utils'
import type { RequestContext } from '@/types/request'

interface TagsPageProps extends RequestContext<{ tag: string }> {}

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

const TagsPage = ({ params }: TagsPageProps) => {
  const tag = params.tag

  const posts = allPosts.filter(
    (post) =>
      post.tags?.some((t) => kebabCase(t)?.includes(tag) && post.published),
  )

  return (
    <>
      <PageHeader title={`#${tag}`} />
      <div id="content">
        <Posts posts={posts} />
      </div>
    </>
  )
}

export default TagsPage
