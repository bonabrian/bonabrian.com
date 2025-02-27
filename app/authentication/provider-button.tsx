'use client';

import { useSearchParams } from 'next/navigation';
import { type ClientSafeProvider, signIn } from 'next-auth/react';
import type { JSX } from 'react';

import { GitHub, Google } from '@/components/shared/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface StyleGuide {
  logo: JSX.Element;
}

const providerStyleGuides: { [key: string]: StyleGuide } = {
  github: {
    logo: <GitHub />,
  },
  google: {
    logo: <Google />,
  },
};

const ProviderButton = ({ provider }: { provider: ClientSafeProvider }) => {
  const { logo } = providerStyleGuides[provider.id];
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/';

  return (
    <Button
      key={provider.id}
      variant="shadow"
      className={cn(
        'border-foreground flex items-center gap-3 text-sm font-medium',
      )}
      onClick={() => signIn(provider.id, { callbackUrl })}
    >
      {logo}
      <span>Sign in with {provider.name}</span>
    </Button>
  );
};

export default ProviderButton;
