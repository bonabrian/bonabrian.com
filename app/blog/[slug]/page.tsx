import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import type { Post } from '@/.contentlayer/generated';
import { allPosts } from '@/.contentlayer/generated';
import { PostHeader } from '@/components/blog';
import Container from '@/components/shared/container';
import Mdx from '@/components/shared/mdx';
import { BASE_URL, ROUTES } from '@/constants';
import { buildJsonLd, seo } from '@/lib/meta';
import { cn, formatDate } from '@/lib/utils';

const findPostBySlug = (slug?: string): Post | undefined =>
  allPosts.filter((post) => post.published).find((post) => post.slug === slug);

export const generateMetadata = async ({
  params,
}: {
  params: { slug?: string };
}): Promise<Metadata | undefined> => {
  const post = findPostBySlug(params?.slug);

  if (!post) return;

  const publishedDate = formatDate(post.date);

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
  });
};

const PostPage = async ({ params }: { params: { slug?: string } }) => {
  const post = findPostBySlug(params?.slug);

  if (!post) return notFound();

  const { title, excerpt, date, readingTime, slug, image, body } = post;

  const publishedDate = formatDate(date);

  return (
    <div className={cn('relative')}>
      <PostHeader
        title={title}
        description={excerpt}
        date={publishedDate}
        readingTime={readingTime}
        slug={slug}
      />
      <figure
        className={cn(
          'saturate-125 pointer-events-none absolute -left-[calc(100vw_-_100%)] -right-[calc(100vw_-_100%)] top-0 -z-[1] max-w-[calc(100vw_+_calc(100vw_-_100%))] overflow-hidden opacity-40 blur transition',
          'dark:opacity-65',
        )}
        style={{ height: '85vh', maxHeight: 380, width: '100vw' }}
      >
        <Image
          src={image ?? ''}
          alt={title}
          priority
          className={cn('h-full w-full object-cover')}
          width={1200}
          height={630}
        />
      </figure>
      <Container>
        <Mdx className={cn('mt-8')} code={body.code} />
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildJsonLd({
            title,
            description: excerpt,
            headline: title,
            datePublished: publishedDate,
            // TODO: will fix modified date
            dateModified: publishedDate,
            url: `${BASE_URL}${ROUTES.blog}/${slug}`,
          }),
        }}
        key="post-jsonld"
      />
    </div>
  );
};

export default PostPage;
