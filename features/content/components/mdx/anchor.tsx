import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import NextLink from 'next/link';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

const linkVariants = cva(
  'font-medium transition-colors hover:text-foreground hover:no-underline',
  {
    variants: {
      variant: {
        muted: 'text-muted-foreground',
      },
    },
  },
);

interface AnchorProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {}

const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>(
  ({ href, className, children, variant, ...props }, ref) => {
    if (!href) {
      throw new Error('Link must have an href');
    }

    if (href.startsWith('/')) {
      return (
        <NextLink
          href={href}
          className={cn(linkVariants({ variant, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </NextLink>
      );
    }

    if (href.startsWith('#')) {
      return (
        <a
          href={href}
          className={cn(linkVariants({ variant, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <a
        href={href}
        className={cn(linkVariants({ variant, className }))}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  },
);

Anchor.displayName = 'Anchor';

export default Anchor;
