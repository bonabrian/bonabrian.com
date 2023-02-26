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
  (
    { href, children, className, showExternalLinkIcon = true, ...rest },
    ref,
  ) => {
    const isExternal =
      href && (href.startsWith('https') || href.startsWith('http'))

    return (
      <NextLink
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener' : undefined}
        ref={ref}
        className={className}
        {...rest}
      >
        {children}
        {showExternalLinkIcon && isExternal && (
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
