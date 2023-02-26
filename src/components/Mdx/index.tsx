import Link from '../link'
import { Image } from './Image'
import { Pre } from './Pre'

export const mdxComponents = {
  hr: <hr className="border-gray-900/50 dark:border-white/60" />,
  a: Link,
  pre: Pre,
  Image,
}

export * from './Image'
export * from './MdxContent'
export * from './Pre'
export * from './ViewsCounter'
