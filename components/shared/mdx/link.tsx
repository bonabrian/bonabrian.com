import NextLink from 'next/link';
import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

const isLocalLink = (href?: string) =>
  href && (href.startsWith('/') || href.startsWith('#'));

interface LinkProps extends ComponentProps<typeof NextLink> {
  title: string;
  openInNewTab?: boolean;
  ignoreNextLink?: boolean;
}

const Link = (props: LinkProps) => {
  const { href, className, ...otherProps } = props;
  const {
    openInNewTab = !isLocalLink(
      typeof href !== 'string' ? href.toString() : href,
    ),
    ignoreNextLink,
    ...rest
  } = otherProps;

  const LinkComponent =
    href.toString().includes('#') || ignoreNextLink ? 'a' : NextLink;

  return (
    <LinkComponent
      {...{ href, ...rest }}
      href={href.toString()}
      className={cn(
        'font-bold transition-all duration-200',
        'hover:text-foreground hover:no-underline',
        className,
      )}
      prefetch={
        LinkComponent === 'a'
          ? undefined
          : openInNewTab || rest.target === '_blank'
            ? false
            : rest.prefetch
      }
      {...(openInNewTab
        ? {
            target: '_blank',
            rel: `${props.rel || ''} noopener noreferrer`.trim(),
          }
        : {})}
    />
  );
};

export default Link;
