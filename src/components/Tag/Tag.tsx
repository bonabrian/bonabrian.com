import { kebabCase } from '@/utils'

import Link from '../Link'

const Tag = ({ text }: { text: string }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <span className='inline text-sm lowercase bg-primary-400 dark:bg-primary-600 text-white px-2 py-0.5 rounded-md'>
        {text}
      </span>
    </Link>
  )
}

export default Tag
