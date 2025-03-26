'use client';

import Link from 'next/link';

import Container from '@/components/container';
import { formatDate } from '@/lib/utils';

import { usePostContext } from './post-provider';

const PostFooter = () => {
  const { slug, modifiedDate } = usePostContext();
  const formattedModifiedDate = formatDate(modifiedDate);

  const editUrl = `https://github.com/bonabrian/bonabrian.com/blob/main/content/posts/${slug}.mdx?plain=1`;

  return (
    <Container>
      <div className="my-8 flex items-center justify-between">
        <Link
          href={editUrl}
          className="text-muted-foreground hover:text-foreground text-sm"
        >
          Edit on GitHub
        </Link>
        <div className="text-muted-foreground text-sm">
          Last updated: {formattedModifiedDate}
        </div>
      </div>
    </Container>
  );
};

export default PostFooter;
