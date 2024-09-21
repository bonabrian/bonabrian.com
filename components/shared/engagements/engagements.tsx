import { cn } from '@/lib/utils';

import Reactions from './reactions';
import ShareButton from './share-button';

const Engagements = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'mx-auto mt-16 flex w-full max-w-sm',
        'sm:max-w-md',
        className,
      )}
    >
      <div
        className={cn(
          'relative flex w-full items-center justify-between gap-4 rounded-xl bg-card p-4 shadow-border',
        )}
      >
        <Reactions />
        <ShareButton />
      </div>
    </div>
  );
};

export default Engagements;
