import cx from 'classnames'
import type { MDXComponents } from 'mdx/types'
import { useMDXComponent } from 'next-contentlayer/hooks'

import Link from '../link'
import Image from './image'
import Pre from './pre'

interface MdxProps {
  code: string
  className?: string
}

const components = {
  Link,
  a: Link,
  pre: Pre,
  Image,
}

const Mdx = ({ code, className }: MdxProps) => {
  const MdxComponent = useMDXComponent(code)

  return (
    <div className={cx('mdx-content', className)}>
      <MdxComponent components={{ ...components } as MDXComponents} />
    </div>
  )
}

export default Mdx
