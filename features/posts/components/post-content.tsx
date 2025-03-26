'use client';

import Container from '@/components/container';
import ContentEngagements from '@/features/content/components/content-engagements';
import Mdx from '@/features/content/components/mdx/mdx';

import { usePostContext } from './post-provider';

const PostContent = () => {
  const { slug, code } = usePostContext();

  return (
    <Container>
      <Mdx code={code} className="mt-8" />
      <ContentEngagements slug={slug} />
    </Container>
  );
};

export default PostContent;
