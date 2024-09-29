import { compareDesc } from 'date-fns';
import type { Metadata } from 'next';

import { allPosts } from '@/.contentlayer/generated';
import FilteredPosts from '@/components/filtered-posts';
import Container from '@/components/shared/container';
import PageHeader from '@/components/shared/page-header';
import { ROUTES } from '@/constants';
import { seo } from '@/lib/meta';

export const metadata: Metadata = seo({
  title: 'Blog',
  description:
    'Blog posts by Bona Brian Siagian. Here I share some thoughts, stories, information, and more about software development.',
  keywords: [
    'blog',
    'story',
    'articles',
    'moments',
    'contents',
    'thoughts',
    'tech',
    'software',
    'development',
  ],
  url: ROUTES.blog,
});

const BlogPage = () => {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <>
      <PageHeader
        title="Blog"
        description="The place where I share my thoughts, ideas and experiences about software development."
      />
      <Container>
        <FilteredPosts posts={posts} />
      </Container>
    </>
  );
};

export default BlogPage;
