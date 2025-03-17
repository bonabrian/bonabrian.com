import { defineConfig } from '@content-collections/core';

import pages from './config/content-collections/pages';
import posts from './config/content-collections/posts';
import projects from './config/content-collections/projects';

export default defineConfig({
  collections: [posts, projects, pages],
});
