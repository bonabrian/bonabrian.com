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
      <div className={cn('flex flex-col justify-between gap-2', 'sm:flex-row')}>
        <Skeleton className={cn('h-20 w-full', 'md:w-1/2')} />
      </div>
      <div className={cn('mt-8 space-y-8')}>
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className={cn('space-y-4')}>
            <Skeleton className={cn('h-8 w-52')} />
            <Skeleton className={cn('h-8 w-64')} />
            <div
              className={cn('my-8 grid grid-cols-1 gap-4', 'md:grid-cols-2')}
            >
              {Array.from({ length: 2 }).map((_, idx) => (
                <Skeleton key={idx} className={cn('h-56 w-full rounded-xl')} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Loading;
