import { kebabCase } from '@/utils'

import Link from '../Link'

const Tag = ({ text }: { text: string }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`} className='no-underline'>
      <span className='inline-flex text-sm lowercase bg-purple-500 dark:bg-purple-600 text-white px-3 py-1 rounded-lg'>
        {text}
      </span>
    </Link>
  )
}

export default Tag
