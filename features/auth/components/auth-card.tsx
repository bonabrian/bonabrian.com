'use client';

import { useSearchParams } from 'next/navigation';
import type { BuiltInProviderType } from 'next-auth/providers/index';
import type { ClientSafeProvider, LiteralUnion } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

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
  const callbackUrl = searchParams.get('callbackUrl') ?? '/';

  useEffect(() => {
    setIsShowError(searchParams.has('error'));
  }, [searchParams]);

  return (
    <>
      <div className="flex flex-col items-center justify-items-center space-y-2 will-change-[transform,opacity] xl:space-y-0">
        <div className="flex flex-col items-center justify-between gap-4">
          {providers && (
            <>
              {Object.values(providers).map((provider) => (
                <ProviderButton
                  key={provider.id}
                  provider={provider}
                  callbackUrl={callbackUrl}
                />
              ))}
            </>
          )}
        </div>
      </div>
      <Dialog open={isShowError} onOpenChange={setIsShowError}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Oops! Something went wrong while authenticating your account.
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-center">
            <p className="text-muted-foreground">
              An unexpected problem occurred while I&apos;m trying to log you
              in. Please try with another providers.
            </p>
            <code className="bg-destructive/50 text-destructive-foreground rounded-lg p-2 font-mono text-sm">
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
