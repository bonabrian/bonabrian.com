'use client';

import Container from '@/components/container';
import ContentEngagements from '@/features/content/components/content-engagements';

import { usePostContext } from './post-provider';

const PostContent = () => {
  const { slug } = usePostContext();

  return (
    <Container>
      <ContentEngagements slug={slug} />
    </Container>
  );
};

export default PostContent;
