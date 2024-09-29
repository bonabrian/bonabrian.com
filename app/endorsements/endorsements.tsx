'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

import Link from '@/components/shared/link';
import RenderIf from '@/components/shared/render-if';
import Spinner from '@/components/shared/spinner';
import { Button } from '@/components/ui/button';
import useEndorsements from '@/hooks/use-endorsements';
import { cn } from '@/lib/utils';
import type { SkillCategory } from '@/types/skill';

import Badge from './badge';

const Endorsements = ({ fallbackData }: { fallbackData: SkillCategory[] }) => {
  const { data: session } = useSession();
  const { endorsements, error, addEndorsement } = useEndorsements({
    fallbackData,
  });
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  return (
    <>
      <div
        className={cn(
          'relative max-w-lg rounded-lg border border-transparent bg-background p-3',
          'after:absolute after:-inset-1 after:-z-10 after:rounded-[calc(8px+3px)] after:bg-rainbow-gradient after:content-[""]',
        )}
      >
        {session?.user ? (
          <>
            <p>
              You are currently logged in as{' '}
              <span className={cn('font-cal font-bold')}>
                {session.user.name}
              </span>
            </p>
            {isAuthenticating ? (
              <Spinner />
            ) : (
              <Link
                href="/api/auth/signout"
                className={cn('font-semibold underline')}
                onClick={async (e) => {
                  e.preventDefault();
                  setIsAuthenticating(true);
                  await signOut();
                }}
              >
                Logout
              </Link>
            )}
          </>
        ) : (
          <div className={cn('flex flex-col items-start')}>
            <h2 className={cn('font-cal font-bold')}>
              Please log in to provide your valuable endorsements.
            </h2>
            <p className={cn('text-sm text-muted-foreground')}>
              Your information, including your name and profile picture, will
              only be utilized to properly display your identity as an endorser.
            </p>
            <Button
              variant="secondary"
              size="sm"
              disabled={isAuthenticating}
              className={cn('mt-4')}
              onClick={async (e) => {
                e.preventDefault();
                setIsAuthenticating(true);
                await signIn();
              }}
            >
              {isAuthenticating ? <Spinner /> : 'Login to endorse'}
            </Button>
          </div>
        )}
      </div>

      <div className={cn('mt-8')}>
        <RenderIf isTrue={endorsements && !error}>
          <div className={cn('flex flex-col')}>
            <h3 className={cn('font-cal text-xl font-bold', 'md:text-2xl')}>
              Skills
            </h3>
            <div className={cn('space-y-8')}>
              {endorsements.map((category) => (
                <div key={category.name}>
                  <h4
                    className={cn(
                      'my-4 font-cal text-lg font-bold leading-5 text-accent-foreground',
                      'md:text-xl',
                    )}
                  >
                    {category.name}
                  </h4>
                  <div
                    className={cn(
                      'grid grid-flow-row auto-rows-auto grid-cols-1 gap-4',
                      'md:grid-cols-2',
                    )}
                  >
                    {category.skills.map((skill) => (
                      <Badge
                        key={skill.id}
                        skill={skill}
                        user={session?.user}
                        currentUserId={session?.id}
                        onEndorse={addEndorsement}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RenderIf>
      </div>
    </>
  );
};

export default Endorsements;
