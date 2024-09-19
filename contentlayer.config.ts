import { makeSource } from 'contentlayer/source-files';

import Post from './config/contentlayer/post';
import mdx from './scripts/contentlayer/mdx';
import Note from './scripts/contentlayer/note';
import Project from './scripts/contentlayer/project';
import TIL from './scripts/contentlayer/til';

const contentLayerConfig = makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Project, Note, TIL],
  mdx,
});

export default contentLayerConfig;
