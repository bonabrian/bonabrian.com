'use client';

import { Clock, Eye } from 'lucide-react';
import { useRef } from 'react';
import type { IReadTimeResults } from 'reading-time';

import { ROUTES } from '@/constants';
import useViews from '@/hooks/use-views';
import { cn } from '@/lib/utils';

import BackButton from '../back-button';
import Container from '../shared/container';
import PageHeader from '../shared/page-header';
import StickyTitle from '../sticky-title';

interface PostHeaderProps {
  title: string;
  date: string;
  readingTime: IReadTimeResults;
  slug: string;
  description?: string;
}

const PostHeader = ({
  title,
  date,
  readingTime,
  slug,
  description,
}: PostHeaderProps) => {
  const { views } = useViews({ slug, trackView: true });
  const pageHeaderRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <BackButton href={ROUTES.blog} />
      <PageHeader title={title} description={description} ref={pageHeaderRef} />
      <StickyTitle title={title} elementRef={pageHeaderRef} />
      <Container>
        <div
          className={cn(
            'mt-4 flex flex-col justify-between gap-2 text-sm font-medium text-muted-foreground',
            'sm:flex-row',
          )}
        >
          <span>
            Published on{' '}
            <time dateTime={date} className={cn('px-1')}>
              {date}
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

export default PostHeader;
