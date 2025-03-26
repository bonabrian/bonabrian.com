import { LinkIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

type As = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingProps<T extends As> = Omit<
  React.ComponentPropsWithoutRef<T>,
  'as'
> & {
  as?: T;
};

const Heading = <T extends As = 'h1'>({
  as,
  className,
  id,
  children,
  ...props
}: HeadingProps<T>) => {
  const Tag = as ?? 'h1';

  return (
    <Tag
      className={cn(
        'font-cal scroll-m-32 tracking-wider text-pretty break-words',
        className,
      )}
      id={id}
      {...props}
    >
      <a
        href={`#${id}`}
        className="group text-foreground hover:text-foreground hover:no-underline"
      >
        {children}
        <LinkIcon
          aria-label="Link to section"
          className="text-muted-foreground ml-2 inline size-4 opacity-0 transition-opacity group-hover:opacity-100"
        />
      </a>
    </Tag>
  );
};

export default Heading;
