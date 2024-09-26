'use client';

import Link from 'next/link';

import { usePostContext } from '@/components/providers/post-provider';
import Container from '@/components/shared/container';
import { cn, formatDate } from '@/lib/utils';

const Footer = () => {
  const { slug, modifiedDate } = usePostContext();
  const modifiedTime = formatDate(modifiedDate);

  const editUrl = `https://github.com/bonabrian/bonabrian.com/blob/v4/content/posts/${slug}.mdx?plain=1`;

  return (
    <Container>
      <div className={cn('my-8 flex justify-between')}>
        <Link href={editUrl}>Edit on GitHub</Link>
        <div className={cn('text-muted-foreground')}>
          Last updated: {modifiedTime}
        </div>
      </div>
    </Container>
  );
};

export default Footer;
