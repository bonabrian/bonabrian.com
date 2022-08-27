/* eslint-disable unused-imports/no-unused-vars */
import type { Post as ContentLayerPost } from 'contentlayer/generated'
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import LoadingSpinner from '@/components/LoadingSpinner'
import { mdxComponents, MdxContent } from '@/components/Mdx'
import { PageSeo } from '@/components/Seo'
import { useMDXComponent } from '@/hooks'
import { getAllPosts } from '@/services/posts'
import type { Post } from '@/types'

const mapContentLayerPost = (post?: ContentLayerPost): Post | null => {
  if (!post) return null
  return { ...post } as Post
}
const SinglePost = ({
  post: contentLayerPost,
  previousPost,
  nextPost,
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
      return <LoadingSpinner />
    }

    if (!post || !MdxComponent) {
      return <div>Error</div>
    }

    return (
      <MdxContent content={post as Post}>
        <MdxComponent components={{ ...mdxComponents } as any} />
      </MdxContent>
    )
  }

  return (
    <>
      <PageSeo
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
        ogType='article'
      />
      {renderContent()}
    </>
  )
}

export default SinglePost

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getAllPosts().map((it: ContentLayerPost) => ({
      params: { slug: it.slug },
    })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allPosts = getAllPosts()
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
