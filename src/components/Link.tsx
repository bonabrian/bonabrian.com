import type { LinkProps as NextLinkProps } from 'next/link'
import NextLink from 'next/link'

type LinkProps = {
  href: string
  children: React.ReactNode
} & React.ComponentPropsWithoutRef<'a'> &
  NextLinkProps

const Link = ({ href, children, ...rest }: LinkProps) => {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    return (
      <NextLink href={href}>
        <a {...rest}>{children}</a>
      </NextLink>
    )
  }

  if (isAnchorLink) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <a target={'_blank'} rel={'noopener noreferrer'} href={href} {...rest}>
      {children}
    </a>
  )
}

export default Link
