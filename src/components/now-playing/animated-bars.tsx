import cn from '@/utils/cn'

const AnimatedBars = () => {
  return (
    <div className={cn('equalizer')}>
      <span className={cn('bar bg-neutral-800', 'dark:text-neutral-900')} />
      <span className={cn('bar bg-neutral-800', 'dark:text-neutral-900')} />
      <span className={cn('bar bg-neutral-800', 'dark:text-neutral-900')} />
      <span className={cn('bar bg-neutral-800', 'dark:text-neutral-900')} />
      <span className={cn('bar bg-neutral-800', 'dark:text-neutral-900')} />
    </div>
  )
}

export default AnimatedBars
