import { HashIcon } from 'lucide-react';

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
        'group relative scroll-m-32 text-pretty break-words font-extrabold text-primary',
        className,
      )}
      id={id}
      {...props}
    >
      <a
        href={`#${id}`}
        className={cn(
          'absolute -left-4 bottom-0 top-0 my-auto hidden -translate-x-2/4 flex-col items-center justify-center text-inherit transition-transform delay-200 will-change-transform',
          'lg:flex',
        )}
      >
        <HashIcon
          aria-label="Link to section"
          className={cn(
            'inline size-min opacity-0 transition-opacity',
            'group-hover:opacity-100',
          )}
        />
      </a>
      {children}
    </Tag>
  );
};

export default Heading;
