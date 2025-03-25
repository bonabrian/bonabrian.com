'use client';

import { useEffect, useState } from 'react';

import Marquee from '@/components/marquee';
import { STACKS } from '@/constants/stacks';

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
            className="bg-card shadow-border flex items-center gap-4 rounded-full px-4 py-1.5"
          >
            {icon}
            <span>{title}</span>
          </div>
        ))}
      </Marquee>
    );
  });

  return <div className="space-y-4 overflow-hidden">{sliders}</div>;
};

export default TechStacks;
