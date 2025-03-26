'use client';

import { LockIcon, LogOutIcon } from 'lucide-react';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import { useEndorsements } from '../hooks/use-endorsements';
import EndorsementsSkeleton from './endorsements-skeleton';
import SkillCard from './skill-card';

const Endorsements = () => {
  const { data: session, status } = useSession();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { endorsements, addEndorsement, isLoading } = useEndorsements();

  const isFetchingAuthStatus = status === 'loading';

  return (
    <>
      {isFetchingAuthStatus ? (
        <Skeleton className="mx-auto h-20 w-full max-w-xl" />
      ) : (
        <>
          {session?.user ? (
            <div className="relative mx-auto w-full max-w-xl">
              <div className="relative overflow-hidden rounded-lg p-1">
                <div className="animate-gradient from-primary absolute inset-0 bg-gradient-to-r via-purple-400 to-pink-400" />
                <div className="bg-background relative rounded-md p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {session.user.image && (
                        <Image
                          src={session.user.image}
                          alt={session.user.name as string}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                      )}
                      <div className="flex flex-col">
                        <p>You are currently logged in as</p>
                        <p className="font-cal">{session.user.name}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      className="gap-2"
                      disabled={isAuthenticating}
                      onClick={async (e) => {
                        e.preventDefault();
                        setIsAuthenticating(true);
                        await signOut();
                      }}
                    >
                      {isAuthenticating ? (
                        'Processing...'
                      ) : (
                        <>
                          <LogOutIcon className="size-4" />
                          Sign out
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-card border-border from-background/90 to-background/80 relative mx-auto w-full max-w-xl overflow-hidden rounded-lg bg-gradient-to-r p-4">
              <div className="from-primary/10 absolute inset-0 bg-gradient-to-r via-purple-400/10 to-pink-400/10" />
              <div className="relative space-y-4 text-center">
                <LockIcon className="text-primary mx-auto" />
                <div className="space-y-2">
                  <h3 className="font-cal tracking-wide">
                    Please log in to provide your valuable endorsements.
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Your information, including your name and profile picture,
                    will only be utilized to properly display your identity as
                    an endorser.
                  </p>
                </div>
                <Button
                  disabled={isAuthenticating}
                  onClick={async (e) => {
                    e.preventDefault();
                    setIsAuthenticating(true);
                    await signIn();
                  }}
                >
                  {isAuthenticating ? 'Processing...' : 'Login to endorse'}
                </Button>
              </div>
            </div>
          )}
        </>
      )}
      <div className="mt-8">
        {isLoading ? (
          <EndorsementsSkeleton />
        ) : (
          <>
            {endorsements.length > 0 && (
              <div className="flex flex-col">
                <div className="space-y-8">
                  {endorsements.map((category) => (
                    <div key={category.name}>
                      <h2 className="font-cal mb-4 text-lg leading-5">
                        {category.name}
                      </h2>
                      <div className="grid grid-flow-row auto-rows-auto grid-cols-1 gap-4 md:grid-cols-2">
                        {category.skills.map((skill) => (
                          <SkillCard
                            key={skill.id}
                            skill={skill}
                            session={session}
                            onEndorse={addEndorsement}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Endorsements;
