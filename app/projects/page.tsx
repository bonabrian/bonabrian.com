import { compareDesc } from 'date-fns';
import type { Metadata } from 'next';

import { allProjects } from '@/.contentlayer/generated';
import { ProjectList } from '@/components/projects';
import Container from '@/components/shared/container';
import PageHeader from '@/components/shared/page-header';
import { ROUTES } from '@/constants';
import { seo } from '@/lib/meta';

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
        <ProjectList projects={projects} />
      </Container>
    </>
  );
};

export default ProjectsPage;
