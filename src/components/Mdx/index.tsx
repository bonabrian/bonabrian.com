import Link from '../Link'
import Pre from './Pre'

export const mdxComponents = {
  hr: <hr className='border-gray-200 dark:border-gray-700' />,
  a: Link,
  pre: Pre,
}

export * from './MdxContent'
export { default } from './Pre'
export * from './ViewsCounter'
