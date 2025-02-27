'use client';

import { compareDesc } from 'date-fns';
import { motion, useInView } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useRef } from 'react';

import { allProjects, type Project } from '@/.contentlayer/generated';
import ProjectCard from '@/components/project-card';
import EmptyState from '@/components/shared/empty-state';
import Link from '@/components/shared/link';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants';
import { cn } from '@/lib/utils';

const MAX_DISPLAY = 2;

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
        <h2 className={cn('font-cal text-primary font-bold')}>
          Highlighted Projects
        </h2>
        <p
          className={cn(
            'font-cal text-secondary-foreground text-xl',
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
              'grid auto-cols-fr grid-cols-1 gap-4',
              'md:grid-cols-2',
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
