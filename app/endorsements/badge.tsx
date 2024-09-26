'use client';

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Check } from 'lucide-react';
import Image from 'next/image';
import type { DefaultSession } from 'next-auth';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

import { Medal } from '@/components/shared/icons';
import RenderIf from '@/components/shared/render-if';
import Spinner from '@/components/shared/spinner';
import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import { SITE } from '@/constants';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import type { Skill } from '@/types/skill';

interface BadgeProps {
  skill: Skill;
  user: DefaultSession['user'];
  currentUserId?: string;
  onEndorse: (skillId: string) => Promise<void>;
}

enum STATE {
  IDLE,
  LOADING,
  ERROR,
  SUCCESS,
}

const Badge = ({ skill, user, currentUserId, onEndorse }: BadgeProps) => {
  const { id, name, users } = skill;
  const isEndorsedByUser = skill.users.find((u) => u.id === currentUserId);
  const isLoggedIn = Boolean(user);
  const isMySelf = user?.email === SITE.author.email;
  const [state, setState] = useState(STATE.IDLE);
  const { toast } = useToast();

  const [hoveredKey, setHoveredKey] = useState('');
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

  const _onEndorse = async (skillId: string) => {
    setState(STATE.LOADING);

    if (!isLoggedIn) {
      await signIn();
      return;
    }

    try {
      await onEndorse(skillId);
      setState(STATE.SUCCESS);
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
          <ToastAction altText="Try again" onClick={() => _onEndorse(skillId)}>
            Try again
          </ToastAction>
        ),
      });
      setState(STATE.IDLE);
    }
  };

  return (
    <div
      className={cn(
        'flex flex-col flex-nowrap items-stretch gap-4 rounded-xl bg-card p-4 shadow-border',
      )}
    >
      <div className={cn('flex items-center justify-between')}>
        <div className={cn('font-cal')}>{name}</div>
        {state === STATE.LOADING ? (
          <Spinner />
        ) : (
          <RenderIf isTrue={!isMySelf}>
            {isEndorsedByUser ? (
              <Button
                variant="ghost"
                className={cn(
                  'gap-1 px-3 py-1',
                  'hover:bg-background hover:text-foreground',
                  'disabled:cursor-not-allowed disabled:opacity-100',
                )}
                title="You already endorsed this skill!"
                disabled
              >
                <span>Endorsed</span>
                <Medal />
              </Button>
            ) : (
              <Button
                variant="shadow"
                title={`Endorse ${name}`}
                size="sm"
                onClick={() => _onEndorse(id)}
              >
                Endorse
              </Button>
            )}
          </RenderIf>
        )}
      </div>
      <div className={cn('flex flex-wrap items-center gap-y-4')}>
        {users.map((user, index) => (
          <div
            className={cn('group relative -mr-4')}
            key={`${user.id}-${index}`}
            onMouseEnter={() => setHoveredKey(`${user.id}-${index}`)}
            onMouseLeave={() => setHoveredKey('')}
          >
            <AnimatePresence mode="popLayout">
              <RenderIf isTrue={hoveredKey === `${user.id}-${index}`}>
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
                  style={{
                    translateX: translateX,
                    rotate: rotate,
                    whiteSpace: 'nowrap',
                  }}
                  className={cn(
                    'absolute -left-full -top-12 z-50 flex translate-x-full flex-col items-center justify-center rounded-md bg-background px-4 py-2 text-xs shadow-xl',
                  )}
                >
                  <div className="absolute inset-x-10 -bottom-px z-30 h-px w-1/5 bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
                  <div className="absolute -bottom-px left-8 z-30 h-px w-2/5 bg-gradient-to-r from-transparent via-primary to-transparent" />
                  <div className="relative z-30 text-sm font-bold text-foreground">
                    {user.name}
                  </div>
                </motion.div>
              </RenderIf>
            </AnimatePresence>
            <Image
              onMouseMove={handleMouseMove}
              height={100}
              width={100}
              src={
                user.image ??
                `https://ui-avatars.com/api/?name=${user.name}&background=B191FF&color=fff&rounded=true`
              }
              alt={user.name}
              className={cn(
                'relative !m-0 size-10 rounded-full border-2 border-card object-cover object-top !p-0 transition duration-500',
                'group-hover:z-30 group-hover:scale-105',
              )}
            />
          </div>
        ))}
      </div>
      <RenderIf isTrue={users.length > 0}>
        <div className={cn('text-sm')}>
          <p>
            <strong>{users.length}</strong>{' '}
            {`${name} endorsement${users.length > 1 ? 's' : ''} from:`}
          </p>
          <p>{users.map((user) => user.name).join(',')}</p>
        </div>
      </RenderIf>
      <RenderIf isTrue={state === STATE.SUCCESS}>
        <p
          className={cn(
            'my-1 flex items-center gap-x-1 text-sm text-green-500',
            'sm:my-2',
          )}
        >
          <Check />
          Thank you for endorsing this skill!
        </p>
      </RenderIf>
    </div>
  );
};

export default Badge;
