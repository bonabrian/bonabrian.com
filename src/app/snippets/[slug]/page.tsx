import type { Snippet as GeneratedSnippet } from 'contentlayer/generated'
import { allSnippets } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { useMDXComponent } from 'next-contentlayer/hooks'

import { mdxComponents, MdxContent } from '@/components/mdx'
import ScrollProgressBar from '@/components/scroll-progress-bar'
import { getMetadata } from '@/lib/metadata'
import type { Snippet } from '@/types'

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string }
}) => {
  const snippet = allSnippets.find(
    (it: GeneratedSnippet) => it.slug === params?.slug,
  )

  if (!snippet) return

  return getMetadata({
    title: snippet.title,
    description: snippet.description,
    keywords: [
      'snippet',
      'code',
      'collection',
      'tricks',
      'shorthand',
      'scripts',
    ],
  })
}

const SnippetPage = ({ params }: { params: { slug: string } }) => {
  const snippet = allSnippets.find(
    (it: GeneratedSnippet) => it.slug === params.slug,
  )

  if (!snippet) notFound()

  const MdxComponent = useMDXComponent(snippet?.body?.code)

  return (
    <>
      <ScrollProgressBar />
      <MdxContent content={snippet as Snippet}>
        <MdxComponent components={{ ...mdxComponents } as any} />
      </MdxContent>
    </>
  )
}

export default SnippetPage
