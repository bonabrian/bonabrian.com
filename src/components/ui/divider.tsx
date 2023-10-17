import cn from '@/lib/cn'

const Divider = () => {
  return (
    <hr
      className={cn(
        'my-2 h-8 w-full animate-pulse border-none text-center text-2xl font-bold before:text-primary before:content-["∿∿∿"]',
      )}
    />
  )
}

export default Divider
