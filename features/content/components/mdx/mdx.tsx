import '../../shiki.css';

import { useMDXComponent } from '@content-collections/mdx/react';
import type { MDXComponents } from 'mdx/types';

import BlurImage from '@/components/blur-image';
import { cn } from '@/lib/utils';

import Anchor from './anchor';
import { CodeBlock, Pre } from './code-block';
import Heading from './heading';
import ImageZoom from './image-zoom';

const components: MDXComponents = {
  h1: (props: React.ComponentPropsWithoutRef<'h1'>) => (
    <Heading as="h1" {...props} />
  ),
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
  Image: (props: React.ComponentPropsWithoutRef<typeof BlurImage>) => (
    <ImageZoom>
      <BlurImage {...props} />
    </ImageZoom>
  ),
  a: Anchor,
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <CodeBlock {...props}>
      <Pre>{props.children}</Pre>
    </CodeBlock>
  ),
};

const Mdx = ({ code, className }: { code: string; className?: string }) => {
  const MdxContent = useMDXComponent(code);

  return (
    <div className={cn('prose dark:prose-dark w-full max-w-none', className)}>
      <MdxContent components={{ ...components }} />
    </div>
  );
};

export default Mdx;
