import { Link } from '@/components/ui'
import { ROUTES } from '@/data/app'
import cn from '@/lib/cn'
import { kebabCase } from '@/lib/utils'

const Tag = ({ tag }: { tag: string }) => {
  return (
    <Link
      href={`${ROUTES.tags}/${kebabCase(tag)}`}
      className={cn(
        'inline-flex h-6 gap-1 rounded-full bg-primary/10 px-2 text-xs font-medium leading-6 text-primary',
      )}
    >
      #{tag}
    </Link>
  )
}

export default Tag
