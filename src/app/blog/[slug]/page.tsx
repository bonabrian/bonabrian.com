import type { Post as ContentLayerPost } from 'contentlayer/generated'
import { allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { useMDXComponent } from 'next-contentlayer/hooks'

import { mdxComponents, MdxContent } from '@/components/mdx'
import ScrollProgressBar from '@/components/scroll-progress-bar'
import { getMetadata } from '@/lib/metadata'
import { formatDate, getBaseUrl } from '@/lib/utils'
import type { Post } from '@/types'

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string }
}) => {
  const post = allPosts.find((it: ContentLayerPost) => it.slug === params?.slug)

  if (!post) return

  const publishedDate = formatDate({ timestamp: post?.date })

  return getMetadata({
    title: post.title,
    description: post.excerpt,
    keywords: [
      ...(post.keywords || []),
      'writing',
      'content',
      'article',
      'story',
      'news',
      'thoughts',
    ],
    openGraph: {
      type: 'article',
      images: `${getBaseUrl()}${post.image}`,
      publishedTime: publishedDate.formatted,
    },
  })
}

const SinglePost = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((it: ContentLayerPost) => it.slug === params?.slug)

  if (!post) notFound()

  const MdxComponent = useMDXComponent(post?.body?.code)

  return (
    <>
      <ScrollProgressBar />
      <MdxContent content={post as Post}>
        <MdxComponent components={{ ...mdxComponents } as any} />
      </MdxContent>
    </>
  )
}

export default SinglePost
