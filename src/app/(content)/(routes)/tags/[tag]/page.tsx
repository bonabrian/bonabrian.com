import { allPosts } from 'contentlayer/generated'

import PageHeader from '@/components/page-header'
import Posts from '@/components/posts'
import { ROUTES } from '@/data/app'
import { seo } from '@/data/meta'
import { kebabCase } from '@/lib/utils'
import type { RequestContext } from '@/types/request'

interface TagsPageProps extends RequestContext<{ tag: string }> {}

export const generateMetadata = async ({
  params,
}: {
  params: { tag: string }
}) => {
  return seo({
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
    url: `${ROUTES.tags}/${params.tag}`,
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
