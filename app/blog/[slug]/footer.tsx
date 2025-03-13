'use client';

import Container from '@/components/container';
import Link from '@/components/shared/link';
import { usePostContext } from '@/features/posts/components/post-provider';
import { cn, formatDate } from '@/lib/utils';

const Footer = () => {
  const { slug, modifiedDate } = usePostContext();
  const modifiedTime = formatDate(modifiedDate);

  const editUrl = `https://github.com/bonabrian/bonabrian.com/blob/v4/content/posts/${slug}.mdx?plain=1`;

  return (
    <Container>
      <div className={cn('my-8 flex justify-between')}>
        <Link href={editUrl} variant="muted">
          Edit on GitHub
        </Link>
        <div className={cn('text-muted-foreground')}>
          Last updated: {modifiedTime}
        </div>
      </div>
    </Container>
  );
};

export default Footer;
