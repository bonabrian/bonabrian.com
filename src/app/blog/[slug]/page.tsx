import type { Post } from 'contentlayer/generated'
import { allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'

import ContentHeader from '@/components/content-header'
import Link from '@/components/link'
import Mdx, { Image } from '@/components/mdx'
import Reactions from '@/components/reactions'
import ScrollProgressBar from '@/components/scroll-progress-bar'
import Tag from '@/components/tag'
import { getJsonLd, getMetadata } from '@/lib/metadata'
import { formatDate, getBaseUrl, getDomainFromUrl } from '@/lib/utils'

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
      <ScrollProgressBar />
      <div className="flex flex-col">
        <article className="article">
          <ContentHeader
            title={title}
            slug={slug}
            excerpt={excerpt}
            date={date}
            readingTime={readingTime}
          />
          <div className="prose dark:prose-dark max-w-none">
            {image && (
              <>
                <Image
                  src={image || ''}
                  alt={`Cover image for article "${title}"`}
                  priority
                  className="object-cover"
                  {...extraImageProps}
                />
                {imageSource && (
                  <figcaption className="text-gray-900/50 dark:text-white/60">
                    Source{' '}
                    <Link href={imageSource} title={imageSource}>
                      {getDomainFromUrl(imageSource)}
                    </Link>
                  </figcaption>
                )}
              </>
            )}
            <Mdx code={post?.body?.code} />
          </div>
          {tags && (
            <div className="flex flex-wrap gap-1 my-4">
              {tags.map((tag) => (
                <Tag key={tag} text={tag} />
              ))}
            </div>
          )}
          {/* <div className="flex justify-between items-center my-4">
            <Reactions slug={slug} />
          </div> */}
          <Reactions slug={slug} />
        </article>
      </div>
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
