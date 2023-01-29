import { kebabCase } from '@/lib/utils'

import Link from '../Link'

const Tag = ({ text }: { text: string }) => {
  return (
    <Link
      href={`/tags/${kebabCase(text)}`}
      className="rounded-2xl font-semibold uppercase px-4 py-2 tracking-tighter text-white bg-pink-500 hover:bg-pink-600 dark:hover:bg-pink-400 text-xs"
    >
      {text}
    </Link>
  )
}

export default Tag
