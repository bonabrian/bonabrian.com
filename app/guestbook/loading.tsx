import Container from '@/components/shared/container';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const Loading = () => {
  return (
    <Container>
      <div className={cn('py-16', 'lg:py-20')}>
        <div className={cn('flex flex-col gap-y-4')}>
          <Skeleton className={cn('h-16 w-1/4')} />
          <Skeleton className={cn('h-8 w-full')} />
        </div>
      </div>
      <div className={cn('my-8 grid grid-cols-1 gap-4')}>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className={cn('flex gap-4')}>
            <Skeleton className={cn('size-10 rounded-full')} />
            <Skeleton
              className={cn('h-20 w-full rounded-xl rounded-tl-none')}
            />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Loading;
