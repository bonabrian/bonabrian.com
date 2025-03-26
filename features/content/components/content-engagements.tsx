import { cn } from '@/lib/utils';

import Reactions from './reactions';
import ShareButton from './share-button';

const ContentEngagements = ({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'mx-auto mt-16 flex w-full max-w-sm sm:max-w-md',
        className,
      )}
    >
      <div className="bg-card relative flex w-full items-center justify-between gap-4 rounded-lg p-4">
        <Reactions slug={slug} />
        <ShareButton slug={slug} />
      </div>
    </div>
  );
};

export default ContentEngagements;
