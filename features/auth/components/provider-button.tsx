import { type ClientSafeProvider, signIn } from 'next-auth/react';
import type { JSX } from 'react';

import { GitHub, Google } from '@/components/icons';
import { Button } from '@/components/ui/button';

const providerLogo: { [key: string]: JSX.Element } = {
  github: <GitHub className="size-5" />,
  google: <Google className="size-5" />,
};

const ProviderButton = ({
  provider,
  callbackUrl,
}: {
  provider: ClientSafeProvider;
  callbackUrl: string;
}) => {
  const logo = providerLogo[provider.id];

  return (
    <Button
      variant="shadow"
      className="flex items-center gap-2"
      onClick={() => signIn(provider.id, { callbackUrl })}
    >
      {logo}
      <span>Sign in with {provider.name}</span>
    </Button>
  );
};

export default ProviderButton;
