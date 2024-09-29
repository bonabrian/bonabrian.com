import Container from '@/components/shared/container';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const Loading = () => {
  return (
    <Container>
      <div className={cn('mt-4', 'md:mt-8')}>
        <Skeleton className={cn('h-6 w-16')} />
      </div>
      <div className={cn('py-16', 'lg:py-20')}>
        <div className={cn('flex flex-col gap-y-4')}>
          <Skeleton className={cn('h-16 w-1/4')} />
          <Skeleton className={cn('h-8 w-full')} />
        </div>
      </div>
      <div className={cn('flex flex-col justify-between gap-2', 'sm:flex-row')}>
        <Skeleton className={cn('h-5 w-48')} />
        <Skeleton className={cn('h-5 w-48')} />
      </div>
      <div className={cn('my-4', 'md:my-8')}>
        <Skeleton className={cn('h-[485px] w-full rounded-xl')} />
      </div>
      <Skeleton className={cn('mb-4 h-8 w-1/2')} />
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className={cn('mb-2 h-7 w-full')} />
      ))}
    </Container>
  );
};

export default Loading;
