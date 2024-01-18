import type { MDXComponents } from 'mdx/types'
import { useMDXComponent } from 'next-contentlayer/hooks'

import cn from '@/utils/cn'

import ImageZoom from '../image-zoom'
import Image from './image'
import Link from './link'
import Pre from './pre'

interface MdxProps {
  code: string
  className?: string
}

const components: MDXComponents = {
  a: Link,
  Link,
  Image: (props: React.ComponentPropsWithoutRef<typeof Image>) => {
    const { alt, ...rest } = props

    return (
      <ImageZoom>
        <Image alt={alt} {...rest} />
      </ImageZoom>
    )
  },
  pre: Pre,
}

const Mdx = ({ code, className }: MdxProps) => {
  const Component = useMDXComponent(code)

  return (
    <div
      className={cn('prose w-full max-w-none', 'dark:prose-dark', className)}
    >
      <Component components={{ ...components }} />
    </div>
  )
}

export default Mdx
