'use client';

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { CheckIcon } from 'lucide-react';
import Image from 'next/image';
import type { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import React, { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ToastAction } from '@/components/ui/toast';
import { SITE } from '@/constants';
import { useToast } from '@/hooks/use-toast';

import { MAX_ENDORSERS_DISPLAY } from '../constants';
import type { Skill } from '../types';
import { formatEndorserNames } from '../utils';

const SkillCard = ({
  skill,
  session,
  onEndorse,
}: {
  skill: Skill;
  session: Session | null;
  onEndorse: (skillId: string) => Promise<void>;
}) => {
  const currentUserId = session?.id;
  const { id: skillId, name, users: endorsers } = skill;
  const isEndorsedByUser = endorsers.find((u) => u.id === currentUserId);
  const [isEndorsing, setIsEndorsing] = useState(false);
  const { toast } = useToast();

  const isLoggedIn = Boolean(session?.user);
  const isMySelf = session?.user?.email === SITE.author.email;

  const totalEndorsements = useMemo(
    (): number => endorsers.length,
    [endorsers.length],
  );

  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);

  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig,
  );

  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig,
  );

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const halfWidth = event.currentTarget.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  const handleEndorse = async () => {
    if (isEndorsing) return;

    if (!isLoggedIn) {
      await signIn();
      return;
    }

    try {
      setIsEndorsing(true);
      await onEndorse(skillId);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'There was a problem to endorse this skill.';

      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: message,
        action: (
          <ToastAction altText="Try again" onClick={() => handleEndorse()}>
            Try again
          </ToastAction>
        ),
      });
    } finally {
      setIsEndorsing(false);
    }
  };

  return (
    <div className="bg-card shadow-border flex flex-col flex-nowrap items-stretch gap-4 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="font-cal">{name}</div>
          {totalEndorsements > 0 && (
            <div className="focus:ring-ring hover:bg-primary/20 bg-primary/10 text-primary inline-flex items-center rounded-full border border-transparent px-2 py-0.5 text-xs font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none">
              {totalEndorsements} endorsement{totalEndorsements > 1 ? 's' : ''}
            </div>
          )}
        </div>
        {!isMySelf && (
          <>
            {isEndorsedByUser ? (
              <Button
                variant="ghost"
                disabled
                className="hover:bg-background hover:text-foreground gap-1 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-100"
                title="You already endorsed this skill!"
              >
                <CheckIcon />
                Endorsed
              </Button>
            ) : (
              <Button
                variant="shadow"
                title={`Endorse ${name}`}
                size="sm"
                onClick={handleEndorse}
                disabled={isEndorsing}
              >
                {isEndorsing ? 'Processing' : 'Endorse'}
              </Button>
            )}
          </>
        )}
      </div>
      <div className="flex items-center gap-x-2">
        <div className="flex w-40 shrink-0 flex-wrap items-center gap-y-4">
          {endorsers.slice(0, MAX_ENDORSERS_DISPLAY).map((endorser) => (
            <div
              key={`${endorser.id}-${skillId}`}
              className="group relative -mr-4"
              onMouseEnter={() => setHoveredKey(`${endorser.id}-${skillId}`)}
              onMouseLeave={() => setHoveredKey(null)}
            >
              <AnimatePresence mode="popLayout">
                {hoveredKey === `${endorser.id}-${skillId}` && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.6 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        type: 'spring',
                        stiffness: 260,
                        damping: 10,
                      },
                    }}
                    exit={{ opacity: 0, y: 20, scale: 0.6 }}
                    style={{ translateX, rotate, whiteSpace: 'nowrap' }}
                    className="bg-background absolute -top-12 -left-full z-50 flex flex-col items-center justify-center rounded-md px-4 py-2 text-xs shadow-xl"
                  >
                    <div className="absolute inset-x-10 -bottom-px z-30 h-px w-1/5 bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
                    <div className="via-primary absolute -bottom-px left-8 z-30 h-px w-2/5 bg-gradient-to-r from-transparent to-transparent" />
                    <div className="text-foreground relative z-30 text-sm font-bold">
                      {endorser.name}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <Image
                onMouseMove={handleMouseMove}
                height={64}
                width={64}
                src={
                  endorser.image ??
                  `https://ui-avatars.com/api/?name=${endorser.name}&background=B191FF&color=fff&rounded=true`
                }
                alt={endorser.name}
                className="border-card relative !m-0 size-10 rounded-full border-2 object-cover object-top !p-0 transition duration-500 group-hover:z-40 group-hover:scale-105"
              />
            </div>
          ))}
          {totalEndorsements > MAX_ENDORSERS_DISPLAY && (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="bg-accent text-muted-foreground z-30 size-10 items-center justify-center rounded-full border-2 p-0 text-xs"
                >
                  +{totalEndorsements - MAX_ENDORSERS_DISPLAY}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>{name} endorsers</DialogTitle>
                  <DialogDescription>
                    {totalEndorsements} people have endorsed this skill.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {endorsers.map((endorser) => (
                    <div
                      key={`dialog-${endorser.id}-${skillId}`}
                      className="bg-card hover:bg-accent flex items-center gap-3 rounded-lg p-2 transition-colors duration-200"
                    >
                      <Image
                        height={64}
                        width={64}
                        src={
                          endorser.image ??
                          `https://ui-avatars.com/api/?name=${endorser.name}&background=B191FF&color=fff&rounded=true`
                        }
                        alt={endorser.name}
                        className="border-card relative !m-0 size-10 rounded-full border-2 object-cover object-top !p-0 transition duration-500 group-hover:z-40 group-hover:scale-105"
                      />
                      <div className="text-foreground font-cal text-sm">
                        {endorser.name}
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
        <span className="text-muted-foreground text-xs">
          {formatEndorserNames(endorsers, MAX_ENDORSERS_DISPLAY)}
        </span>
      </div>
    </div>
  );
};

export default SkillCard;
