import { Skeleton } from '@/components/ui/skeleton';

const GuestbookSkeleton = ({ loop = 3 }: { loop?: number }) => {
  return (
    <div className="space-y-4 py-4">
      {[...Array(loop)].map((key, index) => (
        <div
          key={`${key}-${index}`}
          className="flex items-start space-x-3 px-3"
        >
          <Skeleton className="size-10 shrink-0 rounded-full" />
          <div className="w-full space-y-1">
            <div className="flex flex-col items-start gap-3 md:flex-row md:items-center">
              <Skeleton className="mb-2 h-4 w-full md:w-1/2" />
            </div>
            <div className="flex items-center">
              <Skeleton className="h-16 w-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GuestbookSkeleton;
