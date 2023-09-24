import { Link } from '@/components/ui'
import cn from '@/lib/cn'
import { kebabCase } from '@/lib/utils'

const Tag = ({ tag }: { tag: string }) => {
  return (
    <Link
      href={`/tags/${kebabCase(tag)}`}
      className={cn(
        'inline-flex h-6 gap-1 px-2 text-xs font-medium rounded-full leading-6 bg-primary/10 text-primary',
      )}
    >
      #{tag}
    </Link>
  )
}

export default Tag
