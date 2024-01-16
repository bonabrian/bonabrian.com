import NextLink from 'next/link'

import cn from '@/utils/cn'

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

const Link = ({ href, children, ...props }: LinkProps) => {
  const isExternal =
    href && (href.startsWith('https') || href.startsWith('http'))

  const isHash = href && href.startsWith('#')

  const className = cn(
    'bg-[linear-gradient(rgb(0,0,0,0)70%,rgb(216,189,255)0)] text-foreground no-underline',
    'hover:text-foreground hover:no-underline',
    'dark:bg-[linear-gradient(rgb(0,0,0,0)75%,rgb(164,133,208)0)]',
  )

  if (isExternal) {
    return (
      <a
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        href={href}
        {...props}
      >
        {children}
      </a>
    )
  }

  if (isHash) {
    return (
      <a className={className} href={href} {...props}>
        {children}
      </a>
    )
  }

  return (
    <NextLink className={className} href={href as string} {...props}>
      {children}
    </NextLink>
  )
}

export default Link
