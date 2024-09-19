import type { Project } from '@/.contentlayer/generated';
import { cn } from '@/lib/utils';

import EmptyState from '../shared/empty-state';
import ProjectCard from './project-card';

const ProjectList = ({ projects }: { projects: Array<Project> }) => {
  return (
    <>
      {projects.length ? (
        <div
          className={cn(
            'my-8 grid w-full auto-cols-fr grid-cols-1 gap-8',
            'md:my-12 md:grid-cols-2',
          )}
        >
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <EmptyState message="The projects are probably off having a party somewhere without us!" />
      )}
    </>
  );
};

export default ProjectList;
