import fs from 'fs'
import { bundleMDX } from 'mdx-bundler'
import { join } from 'path'
import readingTime from 'reading-time'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import remarkFootnotes from 'remark-footnotes'
import remarkGfm from 'remark-gfm'

import type { TocHeading } from '@/components/TOCInline'

import getAllFilesRecursively from './files'
import remarkCodeTitles from './remark/code-title'
import remarkImgToJsx from './remark/img-to-jsx'
import remarkTocHeadings from './remark/toc-headings'

const root = process.cwd()
const dataPath = 'src/data'

export const getFiles = (type: string) => {
  const prefixPaths = join(root, dataPath, type)
  const files = getAllFilesRecursively(prefixPaths)
  return files.map((file: string) => file.slice(prefixPaths.length + 1))
}

export const formatSlug = (slug: string) => {
  return slug.replace(/\.(mdx|md)/, '')
}

export interface FrontMatter {
  title: string
  summary: string
  date: string
  url: string
  tags: string[]
  images: string[]
  lastModified: string
  draft: boolean
  slug: string
  viewCount?: number
  layout: string
}

export interface EnhancedFrontMatter extends FrontMatter {
  readingMinutes: number
  fileName: string
}

type FileBySlug = {
  mdxSource: string
  toc: TocHeading[]
  frontMatter: EnhancedFrontMatter
}

export const getFileBySlug = async (
  type: string,
  slug: string,
): Promise<FileBySlug> => {
  const mdxPath = join(root, dataPath, type, `${slug}.mdx`)
  const mdPath = join(root, dataPath, type, `${slug}.md`)

  const source = fs.existsSync(mdxPath)
    ? fs.readFileSync(mdxPath, 'utf8')
    : fs.readFileSync(mdPath, 'utf8')

  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = join(
      root,
      'node_modules',
      'esbuild',
      'esbuild.exe',
    )
  } else {
    process.env.ESBUILD_BINARY_PATH = join(
      root,
      'node_modules',
      'esbuild',
      'bin',
      'esbuild',
    )
  }

  const toc: [] = []
  const { frontmatter, code } = await bundleMDX({
    source,
    // mdx imports can be automatically source from the components directory
    cwd: join(root, 'src/components'),
    mdxOptions(options) {
      // avoid no-param-reassign
      const params = options

      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      params.remarkPlugins = [
        ...(params.remarkPlugins ?? []),
        [remarkTocHeadings, { exportRef: toc }],
        remarkGfm,
        remarkCodeTitles,
        [remarkFootnotes, { inlineNotes: true }],
        remarkImgToJsx,
      ] as any
      params.rehypePlugins = [
        ...(params.rehypePlugins ?? []),
        rehypeSlug,
        rehypeAutolinkHeadings,
        [rehypePrismPlus, { ignoreMissing: true }],
      ]
      return params
    },
    esbuildOptions: (options) => {
      // avoid no-param-reassign
      const params = options

      params.loader = {
        ...params.loader,
        '.js': 'jsx',
        '.ts': 'tsx',
      }
      return params
    },
  })

  return {
    mdxSource: code,
    toc,
    frontMatter: {
      readingMinutes: readingTime(code).minutes,
      fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
      ...(frontmatter as FrontMatter),
      date: new Date(frontmatter.date)?.toISOString(),
      slug,
    },
  }
}
