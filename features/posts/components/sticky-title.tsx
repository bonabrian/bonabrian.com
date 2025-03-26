'use client';

import { motion } from 'framer-motion';
import { useLayoutEffect, useState } from 'react';

import { CommandPalette } from '@/components/command-palette';
import Container from '@/components/container';
import ThemeSwitch from '@/components/theme-switch';
import { Separator } from '@/components/ui/separator';
import useMediaQuery from '@/hooks/use-media-query';
import useScroll from '@/hooks/use-scroll';
import { min } from '@/lib/breakpoints';

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

  if (isMinMd) {
    return (
      <>
        {isScrolled ? (
          <motion.div
            initial="initial"
            animate="animate"
            variants={variants}
            transition={transition}
            className="fixed top-0 right-0 left-0 z-50"
          >
            <Container>
              <div className="bg-background flex h-16 items-center justify-between">
                <h1
                  className="font-cal cursor-pointer text-lg"
                  onClick={scrollToTop}
                >
                  {title}
                </h1>
                <div className="flex items-center gap-1">
                  <Separator orientation="vertical" className="h-6" />
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
            className="fixed top-0 right-0 left-0 z-50"
          >
            <Container>
              <div className="bg-background flex h-16 items-center justify-between text-center shadow-sm backdrop-blur">
                <h1 className="font-cal text-lg">{title}</h1>
              </div>
            </Container>
          </motion.div>
        )}
      </>
    );
  }

  return null;
};

export default StickyTitle;
