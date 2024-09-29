import { compareDesc } from 'date-fns';
import type { Metadata } from 'next';

import { allProjects } from '@/.contentlayer/generated';
import ProjectCard from '@/components/project-card';
import Container from '@/components/shared/container';
import EmptyState from '@/components/shared/empty-state';
import PageHeader from '@/components/shared/page-header';
import { ROUTES } from '@/constants';
import { seo } from '@/lib/meta';
import { cn } from '@/lib/utils';

export const metadata: Metadata = seo({
  title: 'Projects',
  description: 'A collection of finest projects that I have built.',
  keywords: [
    'projects',
    'development',
    'app',
    'portfolio',
    'programming',
    'tech',
    'software',
  ],
  url: ROUTES.projects,
});

const ProjectsPage = () => {
  const projects = allProjects
    .filter((project) => project.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <>
      <PageHeader
        title="Projects"
        description="A collection of finest projects that I have built. ❤️️"
      />
      <Container>
        {projects.length ? (
          <div
            className={cn(
              'grid w-full auto-cols-fr grid-cols-1 gap-4',
              'md:grid-cols-2',
            )}
          >
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <EmptyState message="The projects are probably off having a party somewhere without us!" />
        )}
      </Container>
    </>
  );
};

export default ProjectsPage;
