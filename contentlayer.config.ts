import { makeSource } from 'contentlayer/source-files';

import mdx from './config/contentlayer/mdx';
import Post from './config/contentlayer/post';
import Project from './config/contentlayer/project';
import Note from './scripts/contentlayer/note';
import TIL from './scripts/contentlayer/til';

const contentLayerConfig = makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Project, Note, TIL],
  mdx,
});

export default contentLayerConfig;
