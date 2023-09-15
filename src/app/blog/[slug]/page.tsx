import type { Post } from 'contentlayer/generated'
import { allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'

import Container from '@/components/container'
import ContentMeta from '@/components/content-meta'
import Link from '@/components/link'
import Mdx, { Image } from '@/components/mdx'
import PageHeader from '@/components/page-header'
import Reactions from '@/components/reactions'
import ShareButton from '@/components/share-button'
import cn from '@/lib/cn'
import { getJsonLd, getMetadata } from '@/lib/metadata'
import { formatDate, getBaseUrl, kebabCase } from '@/lib/utils'

const findPostBySlug = (slug: string): Post | undefined =>
  allPosts
    .filter((post: Post) => post.published)
    .find((post: Post) => post.slug === slug)

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string }
}) => {
  const post = findPostBySlug(params.slug)

  if (!post) return

  const publishedDate = formatDate({ timestamp: post?.date })

  return getMetadata({
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords ?? [],
    openGraph: {
      type: 'article',
      images: `${getBaseUrl()}${post.image}`,
      publishedTime: publishedDate.formatted,
    },
  })
}

const Tag = ({ tag }: { tag: string }) => {
  return (
    <Link
      href={`/tags/${kebabCase(tag)}`}
      className={cn(
        'inline-flex h-6 gap-1 px-2 text-xs font-medium rounded-full leading-6',
        '',
      )}
    >
      #{tag}
    </Link>
  )
}

const PostPage = ({ params }: { params: { slug: string } }) => {
  const post = findPostBySlug(params.slug)

  if (!post) return notFound()

  const {
    title,
    slug,
    excerpt,
    readingTime,
    date,
    image,
    imageMeta,
    imageSource,
    tags,
  } = post

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
      <PageHeader title={title} />
      <ContentMeta timestamp={date} readingTime={readingTime} slug={slug} />
      <Container>
        <div id="image-cover" className={cn('mb-8')}>
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
          <div className={cn('mt-16 flex items-center text-sm gap-1')}>
            Tags:
            <div className={cn('flex flex-wrap gap-1')}>
              {tags?.map((tag) => <Tag key={tag} tag={tag} />)}
            </div>
          </div>
        )}

        <div
          className={cn('mt-16 flex mx-auto w-full max-w-sm', 'sm:max-w-md')}
        >
          <div
            className={cn(
              'relative flex justify-between items-center w-full gap-4 border p-4 rounded-lg border-slate-100',
              'dark:border-gray-800',
            )}
          >
            <Reactions slug={slug} />
            <ShareButton slug={slug} />
          </div>
        </div>
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
            url: `${getBaseUrl()}/blog/${slug}`,
          }),
        }}
        key="post-jsonld"
      />
    </>
  )
}

export default PostPage
