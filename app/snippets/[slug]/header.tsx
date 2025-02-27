'use client';

import { Clock, Eye } from 'lucide-react';

import BackButton from '@/components/back-button';
import { useSnippetContext } from '@/components/providers/snippet-provider';
import Container from '@/components/shared/container';
import PageHeader from '@/components/shared/page-header';
import { ROUTES } from '@/constants';
import useViews from '@/hooks/use-views';
import { cn, formatDate } from '@/lib/utils';

const Header = () => {
  const { slug, title, description, date, readingTime } = useSnippetContext();
  const { views } = useViews({ slug, trackView: true });
  const publishedDate = formatDate(date);

  return (
    <>
      <BackButton href={ROUTES.snippets} />
      <PageHeader title={title} description={description} />
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
