import { Container, Skeleton } from '@/components/ui'
import cn from '@/utils/cn'

const Loading = () => {
  return (
    <div className={cn('py-16', 'lg:py-20')}>
      <Container>
        <Skeleton className={cn('mb-4 h-10 w-full', 'md:w-3/4')} />
        <Skeleton className={cn('mb-4 h-10 w-full', 'md:w-3/4')} />
        <Skeleton className={cn('mb-8 h-6 w-full', 'md:w-3/4')} />
        <Skeleton className={cn('h-8 w-32')} />
      </Container>
    </div>
  )
}

export default Loading
