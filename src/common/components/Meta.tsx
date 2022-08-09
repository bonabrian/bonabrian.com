import Head from 'next/head'
import { useRouter } from 'next/router'

import siteMetadata from '../data/siteMetadata'
import type { OpenGraph } from '../types'

type CommonMetaProps = {
  title?: string
  description?: string
  ogType?: OpenGraph
  ogImage?: Array<string> | string
  twImage?: string
  canonicalUrl?: string
}

const CommonMeta = (props: CommonMetaProps) => {
  const router = useRouter()
  const title = props.title
    ? `${props.title} | ${siteMetadata.author}`
    : siteMetadata.title
  const description = props.description || siteMetadata.description
  const canonicalUrl =
    props.canonicalUrl || `${siteMetadata.siteUrl}${router.asPath}`

  return (
    <Head>
      <title>{title}</title>
      <meta name='robots' content={siteMetadata.robots} />
      <meta name='description' content={description} />
      <meta
        property='og:url'
        content={`${siteMetadata.siteUrl}${router.asPath}`}
      />
      <meta name='author' content={siteMetadata.author} />
      <meta property='og:type' content={props.ogType} />
      <meta property='og:site_name' content={siteMetadata.siteName} />
      <meta property='og:description' content={description} />
      <meta property='og:title' content={title} />
      {Array.isArray(props.ogImage) ? (
        props.ogImage.map((image) => (
          <meta property='og:image' content={image} key={image} />
        ))
      ) : (
        <meta property='og:image' content={props.ogImage} />
      )}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content={siteMetadata.twitter} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={props.twImage} />
      <link rel='canonical' href={canonicalUrl} />
    </Head>
  )
}

type PageMetaProps = {
  title?: string
  description?: string
}

export const PageMeta = (props: PageMetaProps) => {
  const ogImageUrl = `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`
  const twImageUrl = `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`

  return (
    <CommonMeta
      title={props.title}
      description={props.description}
      ogType='website'
      ogImage={ogImageUrl}
      twImage={twImageUrl}
    />
  )
}
