import Link from '../Link'
import { Image } from './Image'
import { Pre } from './Pre'

export const mdxComponents = {
  hr: <hr className="border-gray-200 dark:border-gray-700" />,
  a: Link,
  pre: Pre,
  Image,
}

export * from './Image'
export * from './MdxContent'
export * from './Pre'
export * from './ViewsCounter'
