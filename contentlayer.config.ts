import { makeSource } from 'contentlayer/source-files';

import mdx from './config/contentlayer/mdx';
import Page from './config/contentlayer/page';
import Post from './config/contentlayer/post';
import Project from './config/contentlayer/project';
import Snippet from './config/contentlayer/snippet';

const contentLayerConfig = makeSource({
  contentDirPath: 'content',
  documentTypes: [Page, Post, Project, Snippet],
  mdx,
});

export default contentLayerConfig;
