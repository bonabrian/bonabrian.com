import { allPosts, type Post } from 'contentlayer/generated'
import { notFound } from 'next/navigation'

import Mdx, { Image } from '@/components/mdx'
import { Container } from '@/components/ui'
import { BASE_URL, ROUTES } from '@/data/app'
import { buildJsonLd, seo } from '@/data/meta'
import cn from '@/lib/cn'
import { formatDate } from '@/lib/utils'
import type { RequestContext } from '@/types/request'

import ContentMeta from '../../_components/content-meta'
import Engagement from '../../_components/engagement'
import Tag from '../../_components/tag'

interface PostPageProps extends RequestContext<{ slug?: string }> {}

const findPostBySlug = (slug?: string): Post | undefined =>
  allPosts.filter((post) => post.published).find((post) => post.slug === slug)

export const generateMetadata = async ({ params }: PostPageProps) => {
  const post = findPostBySlug(params?.slug)

  if (!post) return

  const publishedDate = formatDate(post?.date)

  return seo({
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords ?? [],
    image: `${BASE_URL}${post.image}`,
    url: `${ROUTES.blog}/${post.slug}`,
    openGraph: {
      type: 'article',
      publishedTime: publishedDate,
    },
  })
}

const PostPage = async ({ params }: PostPageProps) => {
  const post = findPostBySlug(params.slug)

  if (!post) return notFound()

  const { title, slug, excerpt, date, image, imageMeta, imageSource, tags } =
    post

  const extraImageProps = imageMeta
    ? {
        blurDataURL: imageMeta.blur64,
        width: imageMeta.size.width,
        height: imageMeta.size.height,
        placeholder: 'blur' as const,
      }
    : {}

  return (
    <>
      <ContentMeta
        title={post?.title}
        timestamp={post?.date}
        readingTime={post?.readingTime}
        slug={post?.slug}
      />
      <Container>
        <div id="image-cover">
          <Image
            src={image ?? ''}
            alt={title}
            priority
            {...extraImageProps}
            className={cn('object-cover')}
            source={imageSource}
          />
        </div>
        <div className={cn('prose max-w-full', 'dark:prose-dark')}>
          <Mdx code={post?.body?.code} />
        </div>
        {tags && (
          <div className={cn('mt-16 flex items-center gap-1 text-sm')}>
            Tags:
            <div className={cn('flex flex-wrap gap-1')}>
              {tags?.map((tag) => <Tag key={tag} tag={tag} />)}
            </div>
          </div>
        )}
        <Engagement slug={slug} />
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildJsonLd({
            title,
            description: excerpt,
            headline: title,
            datePublished: date,
            dateModified: date,
            image: `${BASE_URL}${image}`,
            url: `${BASE_URL}${ROUTES.blog}/${slug}`,
          }),
        }}
        key="post-jsonld"
      />
    </>
  )
}

export default PostPage
