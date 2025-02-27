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
        'group text-primary relative scroll-m-32 font-extrabold text-pretty break-words',
        className,
      )}
      id={id}
      {...props}
    >
      <a
        href={`#${id}`}
        className={cn(
          'absolute top-0 bottom-0 -left-4 my-auto hidden -translate-x-2/4 flex-col items-center justify-center text-inherit transition-transform delay-200 will-change-transform',
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
