import { forwardRef } from 'react'

import cn from '@/lib/cn'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  wide?: boolean
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ wide, children, className, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex flex-col mx-auto w-full px-4',
          'sm:px-12 md:px-10 lg:px-16 xl:px-6',
          wide ? 'max-w-12xl' : 'max-w-6xl',
          className,
        )}
        {...props}
        ref={ref}
      >
        {children}
      </div>
    )
  },
)

export default Container
