'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

import { Maximize, Minimize, Refresh } from '../icons';
import RenderIf from '../render-if';

interface ImageComparisonProps {
  images: {
    title: string;
    imageUrl:
      | string
      | {
          dark: string;
          light: string;
        };
  }[];
  caption?: string;
}

const ImageComparison = ({ images = [], caption }: ImageComparisonProps) => {
  const { resolvedTheme } = useTheme();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!images.length) return null;

  const handleToggle = () => {
    setSelectedIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
  };

  const handleExpand = () => {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded);
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center space-y-3 rounded-md border px-6 py-3',
      )}
    >
      <div className={cn('relative flex w-full')}>
        {images.map((item, index) => {
          // Determine the source based on whether it's a string or an object
          const src =
            typeof item.imageUrl === 'string'
              ? item.imageUrl
              : resolvedTheme === 'dark'
                ? item.imageUrl.dark
                : item.imageUrl.light;

          return (
            <motion.div
              key={item.title}
              initial={{
                top: '0px',
                left: '0px',
                transform: 'scale(1) translate(0%, 0%)',
                zIndex: selectedIndex === index ? 1 : 0,
              }}
              animate={{
                zIndex: selectedIndex === index ? 1 : 0,
                position: selectedIndex === index ? 'relative' : 'absolute',
                transform: isExpanded
                  ? index === 0
                    ? 'scale(0.5) translate(-51.25%, 0px)'
                    : 'scale(0.5) translate(51.25%, 0px)'
                  : 'scale(1) translate(0%, 0%)',
                transition: { duration: 0.5 },
              }}
              className={cn(
                'bg-background w-full flex-1 origin-[center_center] will-change-transform',
              )}
            >
              <h3 className={cn('font-cal mt-0 text-lg')}>{item.title}</h3>
              <Image
                src={src}
                alt={item.title}
                width={1280}
                height={720}
                className={cn(
                  'rounded-xl object-cover',
                  selectedIndex !== index && !isExpanded && 'invisible',
                )}
                loading="lazy"
              />
            </motion.div>
          );
        })}
      </div>
      <RenderIf isTrue={Boolean(caption)}>
        <p className={cn('text-muted-foreground my-0 text-sm italic')}>
          {caption}
        </p>
      </RenderIf>
      <div className={cn('flex gap-2')}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggle}
              disabled={isExpanded}
            >
              <Refresh className={cn('size-4')} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Toggle</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleExpand}
              className={cn('hidden', 'md:inline-flex')}
            >
              {isExpanded ? (
                <Minimize className={cn('size-4')} />
              ) : (
                <Maximize className={cn('size-4')} />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{isExpanded ? 'Collapse' : 'Expand'}</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default ImageComparison;
