'use client';

import { ClockIcon, EyeIcon } from 'lucide-react';
import { useRef } from 'react';

import Container from '@/components/container';
import IncrementCounter from '@/components/increment-counter';
import PageHeader from '@/components/shared/page-header';
import StickyTitle from '@/components/sticky-title';
import { Skeleton } from '@/components/ui/skeleton';
import { ROUTES } from '@/constants/routes';
import BackButton from '@/features/content/components/back-button';
import { useViews } from '@/features/content/hooks/use-views';
import { formatDate } from '@/lib/utils';

import { usePostContext } from './post-provider';

const PostHeader = () => {
  const { slug, title, excerpt, date, readingTime } = usePostContext();
  const { views, isLoading: isLoadViews } = useViews({ slug, trackView: true });
  const pageHeaderRef = useRef<HTMLDivElement>(null);

  const publishedDate = formatDate(date);

  return (
    <>
      <BackButton href={ROUTES.blog} />
      <PageHeader title={title} description={excerpt} ref={pageHeaderRef} />
      <StickyTitle title={title} elementRef={pageHeaderRef} />
      <Container>
        <div className="text-muted-foreground mt-4 flex flex-col justify-between gap-2 text-sm sm:flex-row">
          <span>
            Published on{' '}
            <time dateTime={publishedDate} className="px-1">
              {publishedDate}
            </time>
          </span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <ClockIcon className="size-5" />
              <span title="Estimated read time">{readingTime}</span>
            </div>
            <div className="flex items-center gap-1" title="Number of view(s)">
              <EyeIcon className="size-5" />
              {isLoadViews ? (
                <Skeleton className="w-16" />
              ) : (
                <>
                  <IncrementCounter to={views} /> views
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PostHeader;
