'use client';

import { compareDesc } from 'date-fns';
import { motion, useInView } from 'framer-motion';
import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

import type { Project } from '@/.content-collections/generated';
import allProjects from '@/.content-collections/generated/allProjects';
import EmptyState from '@/components/empty-state';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';

import { MAX_HIGHLIGHTED_PROJECTS_DISPLAY } from '../constants';
import ProjectCard from './project-card';

const getHighlightedProjects = (
  maxDisplay: number = MAX_HIGHLIGHTED_PROJECTS_DISPLAY,
): Array<Project> =>
  allProjects
    .filter((project) => project.published && project.highlight)
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
      className="will-change-[transform,opacity]"
    >
      <motion.div
        className="mb-4 flex flex-col"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="font-cal text-primary text-sm tracking-wide md:text-base">
          Highlighted projects
        </h2>
        <p className="font-cal text-secondary-foreground md:text-xl">
          What I've been working on
        </p>
      </motion.div>
      {projects.length ? (
        <>
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid auto-cols-fr grid-cols-1 gap-4 md:grid-cols-2"
          >
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </motion.div>
          <div className="my-8 flex items-center justify-center">
            <Button asChild variant="outline">
              <Link href={ROUTES.projects}>
                See all projects <ChevronRightIcon />
              </Link>
            </Button>
          </div>
        </>
      ) : (
        <EmptyState message="The projects are probably off having a party somewhere without us!" />
      )}
    </motion.div>
  );
};

export default HighlightedProjects;
