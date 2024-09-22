'use client';

import { compareDesc } from 'date-fns';
import { motion, useInView } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

import { allProjects, type Project } from '@/.contentlayer/generated';
import { ROUTES } from '@/constants';
import { cn } from '@/lib/utils';

import { ProjectCard } from '../projects';
import EmptyState from '../shared/empty-state';
import { Button } from '../ui/button';

const MAX_DISPLAY = 4;

const getHighlightedProjects = (
  maxDisplay: number = MAX_DISPLAY,
): Array<Project> =>
  allProjects
    .filter((project) => project.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, maxDisplay);

const variants = {
  initial: { y: 40, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

const HighlightedProjects = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  const projects = getHighlightedProjects();
  const isInView = useInView(projectsRef, { once: true, margin: '-100px' });

  return (
    <motion.div
      initial="initial"
      animate={isInView ? 'animate' : 'initial'}
      variants={variants}
      ref={projectsRef}
      transition={{ duration: 0.5 }}
      className={cn('will-change-[transform, opacity]')}
    >
      <motion.div
        className={cn('mb-4 flex flex-col')}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className={cn('font-cal font-bold text-primary')}>
          Highlighted Projects
        </h2>
        <p
          className={cn(
            'font-cal text-xl text-secondary-foreground',
            'md:text-2xl',
          )}
        >
          What I've been working on
        </p>
      </motion.div>
      {projects.length ? (
        <>
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={cn(
              'my-4 grid auto-cols-fr grid-cols-1 gap-8',
              'md:my-8 md:grid-cols-2',
            )}
          >
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </motion.div>
          <div className={cn('my-4 flex items-center justify-center')}>
            <Link href={ROUTES.projects}>
              <Button variant="outline">
                See all projects <ChevronRight />
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <EmptyState message="The projects are probably off having a party somewhere without us!" />
      )}
    </motion.div>
  );
};

export default HighlightedProjects;
