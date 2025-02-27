'use client';

import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

import { ROUTES } from '@/constants';
import { cn } from '@/lib/utils';

import { Close, Expand, Minus } from '../shared/icons';
import RenderIf from '../shared/render-if';
import { Button } from '../ui/button';

const WidgetHeader = ({ onClose }: { onClose: () => void }) => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div
      className={cn(
        'border-muted flex items-center justify-between px-4 py-3 font-medium',
      )}
    >
      <div className={cn('flex items-center gap-4')}>
        <div className={cn('flex gap-2')}>
          <div
            className={cn(
              'group flex size-3.5 cursor-pointer items-center justify-center rounded-full bg-[#FF605C] text-neutral-700',
            )}
            onClick={onClose}
          >
            <Close className={cn('hidden', 'group-hover:flex')} />
          </div>
          <div
            className={cn(
              'group flex size-3.5 cursor-pointer items-center justify-center rounded-full bg-[#FFBD44] text-neutral-700',
            )}
            onClick={onClose}
          >
            <Minus className={cn('hidden', 'group-hover:flex')} />
          </div>
          <div
            className={cn(
              'group flex size-3.5 cursor-pointer items-center justify-center rounded-full bg-[#00CA4E] text-neutral-700',
            )}
            onClick={() => {
              onClose();
              router.push(ROUTES.guestbook);
            }}
          >
            <Expand className={cn('hidden -rotate-45', 'group-hover:flex')} />
          </div>
        </div>
        <h4 className={cn('font-cal tracking-wide')}>Guestbook</h4>
      </div>
      <RenderIf isTrue={Boolean(session)}>
        <Button
          variant="link"
          className={cn('text-sm')}
          onClick={async () => {
            await signOut();
          }}
        >
          Logout
        </Button>
      </RenderIf>
    </div>
  );
};

export default WidgetHeader;
