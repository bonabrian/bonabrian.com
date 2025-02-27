import Image from 'next/image';

import { cn } from '@/lib/utils';

import Link from '../link';
import RenderIf from '../render-if';

interface WorkstationProps {
  items: {
    name: string;
    image: string;
    url: string;
    description?: string;
  }[];
}

const Workstation = ({ items }: WorkstationProps) => {
  return (
    <div className={cn('grid gap-3', 'md:grid-cols-2 md:gap-3.5')}>
      {items.map((item, index) => (
        <Link
          key={`${item.name}-${index}`}
          className={cn(
            'group/workstation text-foreground flex min-h-24 flex-row items-center gap-1.5 overflow-hidden rounded-xl border border-dashed py-1.5 pr-1.5 pl-0.5 transition',
            'hover:text-foreground',
            'focus:text-foreground',
          )}
          href={item.url}
        >
          <Image
            src={item.image}
            alt={item.name}
            width={320}
            height={320}
            className={cn(
              'shadow-primary/30 max-w-[4.5rem] scale-95 p-2 drop-shadow-[0_1px_3px_var(--tw-shadow-color)] transition select-none',
              'md:max-w-[5rem]',
              'lg:max-w-[5.5rem]',
              'group-hover/workstation:scale-100',
            )}
          />
          <div className={cn('flex w-full flex-col gap-0.5 py-0.5')}>
            <p
              className={cn(
                'text-foreground m-0 text-xs font-medium transition',
                'group-hover/workstation:underline',
              )}
            >
              {item.name}
            </p>
            <RenderIf isTrue={Boolean(item.description)}>
              <span className={cn('text-muted-foreground text-xs font-normal')}>
                {item.description}
              </span>
            </RenderIf>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Workstation;
