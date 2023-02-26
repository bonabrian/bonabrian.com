import type { Post as ContentLayerPost } from 'contentlayer/generated'
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

import { mdxComponents, MdxContent } from '@/components/mdx'
import { defaultMetadata, Metadata } from '@/components/metadata'
import ScrollProgressBar from '@/components/scroll-progress-bar'
import Spinner from '@/components/spinner'
import { useMDXComponent } from '@/hooks'
import { getPosts } from '@/lib/contentlayer'
import { formatDate } from '@/lib/utils'
import type { Post } from '@/types'

const mapContentLayerPost = (post?: ContentLayerPost): Post | null => {
  if (!post) return null
  return { ...post } as Post
}

const SinglePost = ({
  post: contentLayerPost,
  _previousPost,
  _nextPost,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const MdxComponent = useMDXComponent(contentLayerPost?.body?.code || '')
  const post = useMemo(
    () => mapContentLayerPost(contentLayerPost),
    [contentLayerPost],
  )
  const router = useRouter()

  const renderContent = () => {
    if (!router.isFallback && !post?.slug) {
      return <div>Not Found</div>
    }

    if (router.isFallback) {
      return <Spinner />
    }

    if (!post || !MdxComponent) {
      return <div>Error</div>
    }

    return (
      <>
        <ScrollProgressBar />
        <MdxContent content={post as Post}>
          <MdxComponent components={{ ...mdxComponents } as any} />
        </MdxContent>
      </>
    )
  }

  const publishedDate = formatDate({ timestamp: post?.date })

  return (
    <>
      <Metadata
        title={post?.title}
        description={post?.excerpt}
        keywords={[
          ...(post?.keywords || []),
          'writing',
          'content',
          'article',
          'story',
          'news',
          'thoughts',
        ]}
        openGraph={{
          type: 'article',
          publishedTime: publishedDate.formatted,
          image: `${defaultMetadata.siteUrl}${post?.image}`,
        }}
      />
      {renderContent()}
    </>
  )
}

export default SinglePost

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getPosts().map((it: ContentLayerPost) => ({
      params: { slug: it.slug },
    })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allPosts = getPosts()
  const post = allPosts.find((it: ContentLayerPost) => it.slug === params?.slug)

  if (!post) {
    return {
      props: {
        post: {
          body: {
            code: 'var Component = () => { return null }; return Component',
          },
        },
      },
    }
  }

  const index = allPosts.indexOf(post)
  const previousPost = allPosts[index + 1] || null
  const nextPost = allPosts[index - 1] || null

  return { props: { post, previousPost, nextPost } }
}
