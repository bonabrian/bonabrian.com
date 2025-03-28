import { compareDesc } from 'date-fns';
import type { Metadata } from 'next';

import { allPosts } from '@/.content-collections/generated';
import Container from '@/components/container';
import PageHeader from '@/components/page-header';
import { ROUTES } from '@/constants/routes';
import FilteredPosts from '@/features/posts/components/filtered-posts';
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
