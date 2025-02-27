import { signIn } from 'next-auth/react';

import { GitHub, Google } from '@/components/shared/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const SignIn = () => {
  return (
    <div className={cn('border-muted flex flex-col border-t')}>
      <div className={cn('space-y-3 p-4')}>
        <p className={cn('text-center text-sm')}>
          Kindly login to start a conversation.
        </p>
        <div className={cn('grid grid-cols-2 gap-2', 'md:gap-4')}>
          <Button
            variant="ghost"
            className={cn(
              'border-foreground flex items-center gap-3 border text-sm font-medium',
            )}
            onClick={() => signIn('github')}
          >
            <GitHub className={cn('hidden', 'sm:flex')} />
            <span>Sign in with GitHub</span>
          </Button>
          <Button
            variant="ghost"
            className={cn(
              'border-foreground flex items-center gap-3 border text-sm font-medium',
            )}
            onClick={() => signIn('google')}
          >
            <Google className={cn('hidden', 'sm:flex')} />
            <span>Sign in with Google</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
