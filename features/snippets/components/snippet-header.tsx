'use client';

import { ClockIcon, EyeIcon } from 'lucide-react';

import Container from '@/components/container';
import IncrementCounter from '@/components/increment-counter';
import PageHeader from '@/components/shared/page-header';
import { Skeleton } from '@/components/ui/skeleton';
import { ROUTES } from '@/constants/routes';
import BackButton from '@/features/content/components/back-button';
import { useViews } from '@/features/content/hooks/use-views';
import { formatDate } from '@/lib/utils';

import { useSnippetContext } from './snippet-provider';

const SnippetHeader = () => {
  const { slug, title, description, date, readingTime } = useSnippetContext();
  const { views, isLoading: isLoadViews } = useViews({ slug, trackView: true });
  const publishedDate = formatDate(date);

  return (
    <>
      <BackButton href={ROUTES.snippets} />
      <PageHeader title={title} description={description} />
      <Container>
        <div className="mt-4 flex flex-col justify-between gap-2 text-sm sm:flex-row">
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
                <Skeleton className="h-5 w-16" />
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

export default SnippetHeader;
