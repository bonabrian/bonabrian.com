'use client';

import { useEffect, useState } from 'react';

import Marquee from '@/components/shared/marquee';
import { STACKS } from '@/constants';
import { cn } from '@/lib/utils';

const TechStacks = () => {
  const [shuffledStacks, setShuffledStacks] = useState<
    Array<[string, React.ReactNode]>
  >([]);

  useEffect(() => {
    const stacks = Object.entries(STACKS);
    const shuffled = [...stacks].sort(() => Math.random() - 0.5);
    setShuffledStacks(shuffled);
  }, []);

  const sliders = Array.from({ length: 2 }, (_, index) => {
    const stackSliders = [...shuffledStacks].sort(() => Math.random() - 0.5);

    return (
      <Marquee key={index} reverse={index === 1} fade pauseOnHover>
        {stackSliders.map(([title, icon], stackIndex) => (
          <div
            key={`${index}-${stackIndex}`}
            className={cn(
              'bg-card shadow-border flex items-center gap-4 rounded-lg p-3',
            )}
          >
            {icon}
            <span>{title}</span>
          </div>
        ))}
      </Marquee>
    );
  });

  return <div className={cn('space-y-4 overflow-hidden')}>{sliders}</div>;
};

export default TechStacks;
