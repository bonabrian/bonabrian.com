import type { LinkProps as NextLinkProps } from 'next/link'
import NextLink from 'next/link'
import { forwardRef } from 'react'
import { HiOutlineExternalLink } from 'react-icons/hi'

type LinkProps = {
  href: string
  children: React.ReactNode
  showExternalLinkIcon?: boolean
} & React.ComponentPropsWithoutRef<'a'> &
  NextLinkProps

const Link = forwardRef<any, LinkProps>(
  ({ href, children, showExternalLinkIcon = true, ...rest }, ref) => {
    const isInternalLink = href && href.startsWith('/')
    const isAnchorLink = href && href.startsWith('#')

    if (isInternalLink) {
      return (
        <NextLink href={href} ref={ref} {...rest}>
          {children}
        </NextLink>
      )
    }

    if (isAnchorLink) {
      return (
        <NextLink ref={ref} href={href} {...rest}>
          {children}
        </NextLink>
      )
    }

    return (
      <NextLink
        ref={ref}
        target="_blank"
        rel="noopener noreferrer"
        href={href}
        {...rest}
      >
        {children}
        {showExternalLinkIcon && (
          <HiOutlineExternalLink
            size={12}
            className="inline-block ml-0.5 align-middle"
          />
        )}
      </NextLink>
    )
  },
)

export default Link
