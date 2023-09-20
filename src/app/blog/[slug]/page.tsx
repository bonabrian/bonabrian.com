import { allPosts, type Post } from 'contentlayer/generated'
import { notFound } from 'next/navigation'

import { Container, Link } from '@/components/common'
import Insights from '@/components/insights'
import Mdx, { Image } from '@/components/mdx'
import { ROUTES } from '@/constants/links'
import cn from '@/lib/cn'
import { getJsonLd, getMetadata } from '@/lib/metadata'
import { formatDate, getBaseUrl, kebabCase } from '@/lib/utils'
import type { RequestContext } from '@/types/request'

import MetaHeader from './meta-header'

interface PostPageProps extends RequestContext<{ slug?: string }> {}

const findPostBySlug = (slug?: string): Post | undefined =>
  allPosts.filter((post) => post.published).find((post) => post.slug === slug)

export const generateMetadata = async ({ params }: PostPageProps) => {
  const post = findPostBySlug(params?.slug)

  if (!post) return

  const publishedDate = formatDate(post?.date)

  return getMetadata({
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords ?? [],
    openGraph: {
      type: 'article',
      images: `${getBaseUrl()}${post.image}`,
      publishedTime: publishedDate,
    },
  })
}

const Tag = ({ tag }: { tag: string }) => {
  return (
    <Link
      href={`/tags/${kebabCase(tag)}`}
      className={cn(
        'inline-flex h-6 gap-1 px-2 text-xs font-medium rounded-full leading-6 bg-primary/10 text-primary',
      )}
    >
      #{tag}
    </Link>
  )
}

const PostPage = ({ params }: PostPageProps) => {
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
      <MetaHeader
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
          <div className={cn('flex items-center text-sm gap-1 mt-16')}>
            Tags:
            <div className={cn('flex flex-wrap gap-1')}>
              {tags?.map((tag) => <Tag key={tag} tag={tag} />)}
            </div>
          </div>
        )}
        <Insights slug={slug} />
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: getJsonLd({
            title,
            description: excerpt,
            headline: title,
            datePublished: date,
            dateModified: date,
            image: `${getBaseUrl()}${image}`,
            url: `${getBaseUrl()}${ROUTES.blog}/${slug}`,
          }),
        }}
        key="post-jsonld"
      />
    </>
  )
}

export default PostPage
