import { Spinner } from '@/components/ui'
import cn from '@/lib/cn'

interface SegmentProps {
  title: string
  icon: JSX.Element
  subHeading?: React.ReactNode
  loading?: boolean
  children: React.ReactNode
}

const Segment = ({
  title,
  icon,
  subHeading,
  loading,
  children,
}: SegmentProps) => {
  return (
    <section className={cn('flex flex-col gap-y-2')}>
      <div className={cn('flex items-center gap-1 text-xl font-medium')}>
        {icon}
        <h2 className={cn('capitalize')}>{title}</h2>
      </div>
      {subHeading && (
        <div
          className={cn(
            'flex flex-col justify-between gap-2',
            'md:flex-row md:items-center',
          )}
        >
          {subHeading}
        </div>
      )}
      {loading ? (
        <div className={cn('flex items-center justify-center')}>
          <Spinner />
        </div>
      ) : (
        <>{children}</>
      )}
    </section>
  )
}

export default Segment
