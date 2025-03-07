'use client';

import { MinusIcon, XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

import { Expand } from '@/components/shared/icons';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';

const WidgetHeader = ({ onClose }: { onClose: () => void }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const actions: {
    id: string;
    name: string;
    icon: React.ReactNode;
    className: string;
  }[] = [
    {
      id: 'close',
      name: 'Close',
      icon: <XIcon className="hidden group-hover:flex" />,
      className: 'group-hover:bg-[#FF605C]',
    },
    {
      id: 'minimize',
      name: 'Minimize',
      icon: <MinusIcon className="hidden group-hover:flex" />,
      className: 'group-hover:bg-[#FFBD44]',
    },
    {
      id: 'maximize',
      name: 'Maximize',
      icon: <Expand className="hidden -rotate-45 group-hover:flex" />,
      className: 'group-hover:bg-[#00CA4E]',
    },
  ];

  const handleOnClick = (action: string) => {
    onClose();
    if (action === 'maximize') router.push(ROUTES.guestbook);
  };

  return (
    <div className="border-muted flex items-center justify-between px-4 py-3 font-medium">
      <div className="flex items-center gap-4">
        <div className="group flex gap-2">
          {actions.map((action) => (
            <div
              key={action.id}
              role="button"
              className={cn(
                'bg-muted flex size-3.5 cursor-pointer items-center justify-center rounded-full p-0.5 text-neutral-700 transition-colors duration-100',
                action.className,
              )}
              aria-label={action.name}
              onClick={() => handleOnClick(action.id)}
            >
              {action.icon}
            </div>
          ))}
        </div>
        <h4 className="font-cal tracking-wide">Guestbook</h4>
      </div>
      {session && (
        <Button
          variant="link"
          className="text-sm"
          onClick={async () => await signOut()}
        >
          Sign out
        </Button>
      )}
    </div>
  );
};

export default WidgetHeader;
