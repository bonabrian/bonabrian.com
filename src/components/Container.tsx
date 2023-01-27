import classnames from 'classnames'
import { forwardRef } from 'react'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={classnames('container mx-auto px-4 md:px-0', className)}
      />
    )
  },
)

export default Container
