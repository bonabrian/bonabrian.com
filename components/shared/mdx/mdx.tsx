'use client';

import type { MDXComponents } from 'mdx/types';
import { useMDXComponent } from 'next-contentlayer2/hooks';

import { cn } from '@/lib/utils';

import Link from '../link';
import AppsGrid from './apps-grid';
import BlurImage from './blur-image';
import CodeBlock from './code-block';
import CodeBlockHeader from './code-block-header';
import CoreStack from './core-stack';
import Heading from './heading';
import ImageComparison from './image-comparison';
import ImageZoom from './image-zoom';
import Workstation from './workstation';

const components: MDXComponents = {
  h2: (props: React.ComponentPropsWithoutRef<'h2'>) => (
    <Heading as="h2" {...props} />
  ),
  h3: (props: React.ComponentPropsWithoutRef<'h3'>) => (
    <Heading as="h3" {...props} />
  ),
  h4: (props: React.ComponentPropsWithoutRef<'h4'>) => (
    <Heading as="h4" {...props} />
  ),
  h5: (props: React.ComponentPropsWithoutRef<'h5'>) => (
    <Heading as="h5" {...props} />
  ),
  h6: (props: React.ComponentPropsWithoutRef<'h6'>) => (
    <Heading as="h6" {...props} />
  ),
  Image: (props: React.ComponentPropsWithoutRef<typeof BlurImage>) => {
    const { alt, ...rest } = props;

    return (
      <ImageZoom>
        <BlurImage alt={alt} {...rest} />
      </ImageZoom>
    );
  },
  a: Link,
  pre: CodeBlock,
  figcaption: CodeBlockHeader,
  AppsGrid,
  Workstation,
  ImageComparison,
  CoreStack,
};

const Mdx = ({ code, className }: { code: string; className?: string }) => {
  const Component = useMDXComponent(code);

  return (
    <div
      className={cn('prose w-full max-w-none', 'dark:prose-dark', className)}
    >
      <Component components={{ ...components }} />
    </div>
  );
};

export default Mdx;
