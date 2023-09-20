import cn from '@/lib/cn'

const Divider = () => {
  return (
    <hr
      className={cn(
        'w-full h-8 my-2 text-2xl border-none text-center font-bold animate-pulse before:content-["∿∿∿"] before:text-primary',
      )}
    />
  )
}

export default Divider
