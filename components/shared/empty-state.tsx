import { cn } from '@/lib/utils';

import { MoodSad } from './icons';

const EmptyState = ({ message }: { message: string }) => {
  return (
    <div
      className={cn(
        'my-4 flex flex-col items-center justify-center space-y-1 py-3',
      )}
    >
      <MoodSad className={cn('size-12')} />
      <p>{message}</p>
    </div>
  );
};

export default EmptyState;
