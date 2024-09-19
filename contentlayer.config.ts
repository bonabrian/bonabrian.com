import { makeSource } from 'contentlayer/source-files';

import Post from './config/contentlayer/post';
import Project from './config/contentlayer/project';
import mdx from './scripts/contentlayer/mdx';
import Note from './scripts/contentlayer/note';
import TIL from './scripts/contentlayer/til';

const contentLayerConfig = makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Project, Note, TIL],
  mdx,
});

export default contentLayerConfig;
