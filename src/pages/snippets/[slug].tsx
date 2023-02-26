import type { Snippet as GeneratedSnippet } from 'contentlayer/generated'
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { mdxComponents, MdxContent } from '@/components/mdx'
import { Metadata } from '@/components/metadata'
import ScrollProgressBar from '@/components/scroll-progress-bar'
import Spinner from '@/components/spinner'
import { useMDXComponent } from '@/hooks'
import { getSnippets } from '@/lib/contentlayer'
import type { Snippet } from '@/types'

const mapContentLayerSnippet = (snippet?: GeneratedSnippet): Snippet | null => {
  if (!snippet) return null
  return { ...snippet } as Snippet
}

const SnippetPage = ({
  snippet: generatedSnippet,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const MdxComponent = useMDXComponent(generatedSnippet?.body?.code || '')
  const snippet = useMemo(
    () => mapContentLayerSnippet(generatedSnippet),
    [generatedSnippet],
  )

  const router = useRouter()

  const renderContent = () => {
    if (!router.isFallback && !snippet?.slug) {
      return <div>Not Found</div>
    }

    if (router.isFallback) {
      return <Spinner />
    }

    if (!snippet || !MdxComponent) {
      return <div>Error</div>
    }

    return (
      <>
        <ScrollProgressBar />
        <MdxContent content={snippet as Snippet}>
          <MdxComponent components={{ ...mdxComponents } as any} />
        </MdxContent>
      </>
    )
  }

  return (
    <>
      <Metadata
        title={snippet?.title}
        description={snippet?.description}
        keywords={[
          'snippet',
          'code',
          'collection',
          'tricks',
          'shorthand',
          'scripts',
        ]}
      />
      {renderContent()}
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getSnippets([]).map((it: GeneratedSnippet) => ({
      params: { slug: it.slug },
    })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allSnippets = getSnippets()
  const snippet = allSnippets.find(
    (it: GeneratedSnippet) => it.slug === params?.slug,
  )

  if (!snippet) {
    return {
      props: {
        snippet: {
          body: {
            code: 'var Component = () => { return null }; return Component',
          },
        },
      },
    }
  }

  return { props: { snippet } }
}

export default SnippetPage
