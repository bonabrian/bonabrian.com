import { kebabCase } from '@/lib/utils'

import Link from '../Link'

const Tag = ({ text }: { text: string }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`} className="no-underline">
      <span className="inline-flex text-sm lowercase bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">
        {text}
      </span>
    </Link>
  )
}

export default Tag
