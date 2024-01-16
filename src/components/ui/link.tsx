import NextLink from 'next/link'
import type { ComponentProps } from 'react'

interface LinkProps extends ComponentProps<typeof NextLink> {
  href: string
}

const isLocalLink = (href: string) =>
  href && (href.startsWith('/') || href.startsWith('#'))

const Link = ({ href, ...rest }: LinkProps) => {
  const openInNewTab = !isLocalLink(href)

  const LinkComponent = href.includes('#') ? 'a' : NextLink

  return (
    <LinkComponent
      href={href}
      {...(openInNewTab
        ? {
            target: '_blank',
            rel: `${rest.rel || ''} noopener noreferrer`.trim(),
          }
        : {})}
      {...rest}
    />
  )
}

export default Link
