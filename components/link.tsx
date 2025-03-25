import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import NextLink from 'next/link';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

const linkVariants = cva(
  'font-bold transition-colors hover:text-foreground hover:no-underline',
  {
    variants: {
      variant: {
        muted: 'text-muted-foreground',
      },
    },
  },
);

interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, className, children, variant, ...props }, ref) => {
    if (!href) {
      throw new Error('Link must have an href');
    }

    if (href.startsWith('/')) {
      return (
        <NextLink
          ref={ref}
          className={cn(linkVariants({ variant, className }))}
          href={href}
          {...props}
        >
          {children}
        </NextLink>
      );
    }

    if (href.startsWith('#')) {
      return (
        <a
          ref={ref}
          className={cn(linkVariants({ variant, className }))}
          href={href}
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <a
        ref={ref}
        className={cn(linkVariants({ variant, className }))}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  },
);

Link.displayName = 'Link';

export default Link;
