import type { LinkProps as NextLinkProps } from 'next/link'
import NextLink from 'next/link'
import { forwardRef } from 'react'
import { HiOutlineExternalLink } from 'react-icons/hi'

type LinkProps = {
  href: string
  children: React.ReactNode
} & React.ComponentPropsWithoutRef<'a'> &
  NextLinkProps

const Link = forwardRef<any, LinkProps>(({ href, children, ...rest }, ref) => {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    return (
      <NextLink href={href}>
        <a ref={ref} {...rest}>
          {children}
        </a>
      </NextLink>
    )
  }

  if (isAnchorLink) {
    return (
      <a ref={ref} href={href} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <a
      className='flex items-center'
      ref={ref}
      target={'_blank'}
      rel={'noopener noreferrer'}
      href={href}
      {...rest}
    >
      <span>{children}</span>
      <HiOutlineExternalLink className='inline-block ml-0.5' />
    </a>
  )
})

export default Link
