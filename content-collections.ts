import { defineConfig } from '@content-collections/core';

import posts from './config/content-collections/posts';
import projects from './config/content-collections/projects';

export default defineConfig({
  collections: [posts, projects],
});
