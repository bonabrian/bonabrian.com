import Image from 'next/image';

import { cn } from '@/lib/utils';

import Link from '../link';

interface AppsGridProps {
  apps: {
    name: string;
    image: string;
    url: string;
  }[];
}

const AppsGrid = ({ apps }: AppsGridProps) => {
  const sortedApps = apps.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className={cn('bg-grid rounded-xl border-2 border-dashed')}>
      <ol
        className={cn(
          'm-0 grid list-none grid-cols-[repeat(3,minmax(0,120px))] items-center justify-center gap-4 px-3 py-6',
          'sm:grid-cols-[repeat(3,minmax(0,108px))]',
          'md:grid-cols-[repeat(4,minmax(0,108px))]',
          'lg:grid-cols-[repeat(5,minmax(0,108px))]',
        )}
      >
        {sortedApps.map((app, index) => {
          return (
            <li key={`${app.name}-${index}`} className={cn('p-0')}>
              <Link
                href={app.url}
                className={cn(
                  'group/apps text-foreground flex flex-col items-center rounded-md pb-1 transition',
                  'hover:text-foreground hover:underline',
                  'focus:text-foreground focus:underline',
                  'md:gap-1',
                )}
              >
                <Image
                  src={app.image}
                  alt={app.name}
                  width={72}
                  height={72}
                  className={cn(
                    'shadow-primary/30 max-w-12 scale-95 border-none drop-shadow-[0_1px_3px_var(--tw-shadow-color)] transition',
                    'group-hover/apps:scale-100',
                    'sm:max-w-14',
                    'md:max-w-16',
                  )}
                />
                <span
                  className={cn(
                    'max-w-[calc(100%-0.25rem)] truncate text-xs font-medium text-inherit',
                  )}
                >
                  {app.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default AppsGrid;
