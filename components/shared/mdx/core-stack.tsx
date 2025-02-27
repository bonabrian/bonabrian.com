import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { CORE_STACKS } from '@/constants';
import { cn } from '@/lib/utils';

import Link from '../link';

const CoreStack = () => {
  return (
    <ul
      className={cn(
        'relative grid list-none grid-flow-dense grid-cols-3 items-center justify-center gap-y-10 overflow-hidden [background-image:radial-gradient(hsl(var(--foreground))_1px,_transparent_1px)] [background-size:1rem_1rem] bg-repeat px-4 py-8',
        'md:[background-size:1.25rem_1.25rem]',
        'lg:[background-size:1.5rem_1.5rem]',
      )}
    >
      {CORE_STACKS.map((stack) => (
        <li
          key={stack.name}
          className={cn(
            'bg-background m-auto flex max-w-14 flex-row items-center justify-center',
          )}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={stack.link}
                className={cn(
                  'size-10 transform text-current transition',
                  'hover:scale-110',
                  'focus:scale-110',
                )}
              >
                {stack.icon}
              </Link>
            </TooltipTrigger>
            <TooltipContent>{stack.name}</TooltipContent>
          </Tooltip>
        </li>
      ))}
    </ul>
  );
};

export default CoreStack;
