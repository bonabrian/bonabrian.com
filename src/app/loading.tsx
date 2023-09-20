import { Spinner } from '@/components/common'
import cn from '@/lib/cn'

const Loading = () => {
  return (
    <div className={cn('min-h-screen flex items-center justify-center')}>
      <Spinner />
    </div>
  )
}

export default Loading
