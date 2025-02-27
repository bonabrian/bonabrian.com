'use client';

import { motion } from 'framer-motion';
import { useLayoutEffect, useState } from 'react';

import useMediaQuery from '@/hooks/use-media-query';
import useScroll from '@/hooks/use-scroll';
import { min } from '@/lib/breakpoints';
import { cn } from '@/lib/utils';

import CommandPalette from './shared/command-palette';
import Container from './shared/container';
import RenderIf from './shared/render-if';
import ThemeSwitch from './shared/theme-switch';
import { Separator } from './ui/separator';

interface StickyTitleProps {
  title: string;
  elementRef: React.RefObject<HTMLDivElement | null>;
  gap?: number;
}

const StickyTitle = ({ title, elementRef, gap = -64 }: StickyTitleProps) => {
  const [threshold, setThreshold] = useState(0);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (elementRef.current !== null) {
        setThreshold(elementRef.current.clientHeight);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [elementRef]);

  const isScrolled = useScroll(threshold + gap);

  const transition = { duration: 0.3, ease: 'easeInOut' };
  const variants = {
    initial: { opacity: isScrolled ? 0 : 1, y: isScrolled ? gap : 0 },
    animate: { opacity: isScrolled ? 1 : 0, y: isScrolled ? 0 : gap },
  };

  const isMinMd = useMediaQuery(min('md'));

  const scrollToTop = () => {
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  return (
    <RenderIf isTrue={isMinMd}>
      <>
        {isScrolled ? (
          <motion.div
            initial="initial"
            animate="animate"
            variants={variants}
            transition={transition}
            className={cn('fixed top-0 right-0 left-0 z-50')}
          >
            <Container>
              <div
                className={cn(
                  'bg-background flex h-16 items-center justify-between',
                )}
              >
                <h1
                  className={cn('font-cal cursor-pointer text-lg')}
                  onClick={scrollToTop}
                >
                  {title}
                </h1>
                <div className={cn('flex items-center gap-1')}>
                  <Separator orientation="vertical" className={cn('h-6')} />
                  <ThemeSwitch />
                  <CommandPalette />
                </div>
              </div>
            </Container>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: gap }}
            transition={transition}
            className={cn('fixed top-0 right-0 left-0 z-50')}
          >
            <Container>
              <div
                className={cn(
                  'bg-background flex h-16 items-center justify-between text-center shadow-sm backdrop-blur',
                )}
              >
                <h1 className={cn('font-cal text-lg')}>{title}</h1>
              </div>
            </Container>
          </motion.div>
        )}
      </>
    </RenderIf>
  );
};

export default StickyTitle;
