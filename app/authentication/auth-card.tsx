'use client';

import { useSearchParams } from 'next/navigation';
import type { BuiltInProviderType } from 'next-auth/providers';
import type { ClientSafeProvider, LiteralUnion } from 'next-auth/react';
import { useEffect, useState } from 'react';

import RenderIf from '@/components/shared/render-if';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

import ProviderButton from './provider-button';

const AuthCard = ({
  providers,
}: {
  providers: Record<
    LiteralUnion<BuiltInProviderType>,
    ClientSafeProvider
  > | null;
}) => {
  const [isShowError, setIsShowError] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsShowError(searchParams.has('error'));
  }, [searchParams]);

  return (
    <>
      <div
        className={cn(
          'flex flex-col items-center justify-items-center space-y-2 will-change-[transform,opacity]',
          'xl:space-y-0',
        )}
      >
        <div className={cn('flex flex-col items-center justify-between gap-4')}>
          <RenderIf isTrue={Boolean(providers)}>
            {Object.values(providers!).map((provider) => (
              <ProviderButton key={provider.name} provider={provider} />
            ))}
          </RenderIf>
        </div>
      </div>
      <Dialog open={isShowError} onOpenChange={setIsShowError}>
        <DialogContent>
          <DialogHeader className={cn('pt-4')}>
            <DialogTitle>
              Oops! Something went wrong while authenticating your account.
            </DialogTitle>
          </DialogHeader>
          <div className={cn('text-center')}>
            <p className={cn('text-muted-foreground text-sm')}>
              An unexpected problem occurred while I&apos;m trying to log you
              in. Please try with another providers.
            </p>
            <code className={cn('text-destructive text-sm')}>
              Error: {searchParams.get('error')}
            </code>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AuthCard;
