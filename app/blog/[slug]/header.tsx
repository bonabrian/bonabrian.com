'use client';

import { Clock, Eye } from 'lucide-react';
import { useRef } from 'react';

import BackButton from '@/components/back-button';
import { usePostContext } from '@/components/providers/post-provider';
import Container from '@/components/shared/container';
import PageHeader from '@/components/shared/page-header';
import StickyTitle from '@/components/sticky-title';
import { ROUTES } from '@/constants';
import useViews from '@/hooks/use-views';
import { cn, formatDate } from '@/lib/utils';

const Header = () => {
  const { slug, title, excerpt, date, readingTime } = usePostContext();
  const { views } = useViews({ slug, trackView: true });
  const pageHeaderRef = useRef<HTMLDivElement>(null);
  const publishedDate = formatDate(date);

  return (
    <>
      <BackButton href={ROUTES.blog} />
      <PageHeader title={title} description={excerpt} ref={pageHeaderRef} />
      <StickyTitle title={title} elementRef={pageHeaderRef} />
      <Container>
        <div
          className={cn(
            'text-muted-foreground mt-4 flex flex-col justify-between gap-2 text-sm font-medium',
            'sm:flex-row',
          )}
        >
          <span>
            Published on{' '}
            <time dateTime={publishedDate} className={cn('px-1')}>
              {publishedDate}
            </time>
          </span>
          <div className={cn('flex items-center gap-4')}>
            <div className={cn('flex items-center gap-1')}>
              <Clock className={cn('size-4')} />
              <span title="Estimated read time">{readingTime?.text}</span>
            </div>
            <div className={cn('flex items-center gap-1')}>
              <Eye className={cn('size-4')} />
              <span title="Number of view(s)">{views ?? '-'} views</span>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Header;
