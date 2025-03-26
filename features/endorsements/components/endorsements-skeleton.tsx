import { Skeleton } from '@/components/ui/skeleton';

const EndorsementsSkeleton = ({ loop = 2 }: { loop?: number }) => {
  return (
    <div className="space-y-8">
      {Array.from({ length: loop }).map((_, index) => (
        <div key={index}>
          <Skeleton className="mb-4 h-5 w-32" />
          <div className="grid grid-flow-row auto-rows-auto grid-cols-1 gap-4 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, childIndex) => (
              <Skeleton key={childIndex} className="h-28 w-full" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EndorsementsSkeleton;
