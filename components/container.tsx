import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  wide?: boolean;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, wide, ...props }, ref) => (
    <div
      className={cn(
        'mx-auto flex w-full flex-col px-4',
        wide ? 'max-w-12xl' : 'max-w-5xl',
        className,
      )}
      {...props}
      ref={ref}
    >
      {children}
    </div>
  ),
);

Container.displayName = 'Container';

export default Container;
