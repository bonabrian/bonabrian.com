import { forwardRef } from 'react'

import cn from '@/utils/cn'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn('animate-pulse rounded-md bg-border', className)}
        {...props}
        ref={ref}
      />
    )
  },
)

export default Skeleton
