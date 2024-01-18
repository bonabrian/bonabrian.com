import type { Post } from 'contentlayer/generated'
import { allPosts } from 'contentlayer/generated'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import Engagements from '@/components/engagements'
import ImageZoom from '@/components/image-zoom'
import Mdx from '@/components/mdx'
import { Container } from '@/components/ui'
import { ROUTES } from '@/config/links'
import { BASE_URL } from '@/config/site'
import { buildJsonLd, seo } from '@/lib/meta'
import type { RequestContext } from '@/types/request'
import cn from '@/utils/cn'
import { formatDate } from '@/utils/date'

import Header from './header'

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
    url: `${ROUTES.blog}/${post.slug}`,
    date: publishedDate,
    openGraph: {
      type: 'article',
      publishedTime: publishedDate,
    },
  })
}

const PostPage = async ({ params }: PostPageProps) => {
  const post = findPostBySlug(params.slug)

  if (!post) return notFound()

  const { title, excerpt, date, readingTime, slug, image, imageMeta, body } =
    post

  const extraImageProps = imageMeta
    ? {
        blurDataURL: imageMeta.blur64,
        width: imageMeta.size.width,
        height: imageMeta.size.height,
        placeholder: 'blur' as const,
      }
    : {}

  const publishedDate = formatDate(date)

  return (
    <>
      <Header
        title={title}
        date={publishedDate}
        readingTime={readingTime}
        slug={slug}
        description={excerpt}
      />
      <Container>
        <div className={cn('my-4', 'md:my-8')} id="thumbnail">
          <ImageZoom
            zoomImg={{
              src: image ?? '',
              alt: title,
            }}
          >
            <Image
              src={image ?? ''}
              alt={title}
              priority
              className={cn('rounded-xl object-cover')}
              width={1200}
              height={630}
              data-zoomable
              {...extraImageProps}
            />
          </ImageZoom>
        </div>
        <Mdx code={body?.code} />
        <Engagements slug={slug} />
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildJsonLd({
            title,
            description: excerpt,
            headline: title,
            datePublished: publishedDate,
            dateModified: publishedDate,
            url: `${BASE_URL}${ROUTES.blog}/${slug}`,
          }),
        }}
        key="post-jsonld"
      />
    </>
  )
}

export default PostPage
