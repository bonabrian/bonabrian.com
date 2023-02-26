import Link from '../link'
import Image from './image'
import MdxContent from './mdx-content'
import Pre from './pre'
import ViewsCounter from './views-counter'

export const mdxComponents = {
  hr: <hr className="border-gray-900/50 dark:border-white/60" />,
  a: Link,
  pre: Pre,
  Image,
}

export { Image, MdxContent, Pre, ViewsCounter }
