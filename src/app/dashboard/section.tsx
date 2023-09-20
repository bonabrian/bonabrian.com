import { Spinner } from '@/components/common'
import cn from '@/lib/cn'

interface SectionProps {
  title: string
  icon: JSX.Element
  subHeading?: React.ReactNode
  loading?: boolean
  children: React.ReactNode
}

const Section = ({
  title,
  icon,
  subHeading,
  loading,
  children,
}: SectionProps) => {
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

export default Section
