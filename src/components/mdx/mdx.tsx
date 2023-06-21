import type { MDXComponents } from 'mdx/types'
import { useMDXComponent } from 'next-contentlayer/hooks'

import cn from '@/lib/cn'

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
    <div className={cn('mdx', className)}>
      <MdxComponent components={{ ...components } as MDXComponents} />
    </div>
  )
}

export default Mdx
