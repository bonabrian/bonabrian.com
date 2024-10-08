// move to contentlayer2 to fix issue with contentlayer
// see https://github.com/contentlayerdev/contentlayer/issues/558
import { makeSource } from 'contentlayer2/source-files';

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
