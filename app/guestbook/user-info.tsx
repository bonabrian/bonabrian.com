'use client';

import { signOut, useSession } from 'next-auth/react';

import Link from '@/components/shared/link';
import RenderIf from '@/components/shared/render-if';
import { cn } from '@/lib/utils';

const UserInfo = ({ isWidget }: { isWidget?: boolean }) => {
  const { data: session } = useSession();

  return (
    <RenderIf isTrue={Boolean(session)}>
      <div
        className={cn(
          'flex flex-col items-start gap-2 px-4',
          'md:flex-row md:items-center',
          isWidget ? 'pb-3 text-xs' : 'text-sm',
        )}
      >
        <div className={cn('flex flex-wrap gap-1')}>
          <p>
            You are currently logged in as{' '}
            <span className={cn('font-semibold')}>{session?.user.name}</span>
          </p>
          <RenderIf isTrue={!isWidget}>
            <Link
              href="/api/auth/signout"
              className={cn('font-semibold underline')}
              onClick={async (e) => {
                e.preventDefault();
                await signOut();
              }}
            >
              Logout
            </Link>
          </RenderIf>
        </div>
      </div>
    </RenderIf>
  );
};

export default UserInfo;
