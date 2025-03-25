'use client';

import Container from '@/components/container';
import ContentEngagements from '@/features/content/components/content-engagements';
import Mdx from '@/features/content/components/mdx/mdx';

import { useSnippetContext } from './snippet-provider';

const SnippetContent = () => {
  const { slug, code } = useSnippetContext();

  return (
    <Container>
      <Mdx code={code} />
      <ContentEngagements slug={slug} />
    </Container>
  );
};

export default SnippetContent;
