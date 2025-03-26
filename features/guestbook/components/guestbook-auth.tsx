import { signIn } from 'next-auth/react';

import { GitHub, Google } from '@/components/icons';
import { Button } from '@/components/ui/button';

const GuestbookAuth = () => {
  return (
    <div className="border-muted flex flex-col border-t">
      <div className="space-y-3 p-4">
        <p className="text-center text-sm">
          Just log in to start a chat. No worries, your data is safe!
        </p>
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          <Button
            variant="ghost"
            className="border-border flex items-center gap-3 border text-sm font-medium"
            onClick={() => signIn('github')}
          >
            <GitHub className="hidden sm:flex" />
            <span>Sign in with GitHub</span>
          </Button>
          <Button
            variant="ghost"
            className="border-border flex items-center gap-3 border text-sm font-medium"
            onClick={() => signIn('github')}
          >
            <Google className="hidden sm:flex" />
            <span>Sign in with Google</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GuestbookAuth;
