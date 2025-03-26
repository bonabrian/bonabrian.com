import Container from '@/components/container';
import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <Container>
      <div className="py-16 lg:py-20">
        <div className="flex flex-col gap-y-4">
          <Skeleton className="h-16 w-1/4" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
      <div className="flex flex-col justify-between gap-2 sm:flex-row">
        <Skeleton className="h-20 w-full md:w-1/2" />
      </div>
      <div className="mt-8 space-y-8">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="space-y-4">
            <Skeleton className="h-8 w-52" />
            <Skeleton className="h-8 w-64" />
            <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              {Array.from({ length: 2 }).map((_, idx) => (
                <Skeleton key={idx} className="h-56 w-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Loading;
