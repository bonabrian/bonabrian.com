import { Spinner } from '@/components/ui'
import cn from '@/lib/cn'

const Loading = () => {
  return (
    <div className={cn('flex min-h-screen items-center justify-center')}>
      <Spinner />
    </div>
  )
}

export default Loading
