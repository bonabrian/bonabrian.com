'use client';

import { motion } from 'framer-motion';
import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';

import Container from '@/components/container';
import FlipWords from '@/components/flip-words';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';

import CurrentTechStack from './current-tech-stack';

const Hero = () => {
  return (
    <div className="bg-grid py-16 lg:py-20">
      <Container>
        <div className="font-cal">
          <motion.h1
            className="from-foreground via-foreground/90 to-foreground/70 mb-4 flex flex-col justify-center gap-1 bg-gradient-to-b to-90% bg-clip-text pb-2 text-4xl font-bold text-transparent md:text-5xl lg:text-6xl"
            initial={{ x: -32, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <span>
              Hi, I'm <span className="text-primary">Bona Brian Siagian</span>
            </span>
            <span>Software Engineer</span>
          </motion.h1>
          <motion.div className="from-foreground via-foreground/90 to-foreground/70 bg-gradient-to-b to-90% bg-clip-text font-bold text-transparent md:text-xl">
            I craft{' '}
            <FlipWords
              words={['interactive', 'amazing', 'fantastic', 'beautiful']}
              className="text-primary font-black"
            />{' '}
            things with code. I also talk and write about those things.
          </motion.div>
        </div>

        <div className="mt-6 md:mt-8">
          <motion.div
            className="relative"
            initial={{ x: -16, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Button asChild variant="shadow" className="group">
              <Link href={ROUTES.about}>
                Discover more{' '}
                <ChevronRightIcon className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <div className="mt-16 lg:mt-20">
          <CurrentTechStack />
        </div>
      </Container>
    </div>
  );
};

export default Hero;
