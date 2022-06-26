import Head from 'next/head'
import { useRouter } from 'next/router'

const defaultMeta = {
  title: 'Bona Brian Siagian',
  siteName: 'bonabrian.com',
  description:
    'An online portfolio, showcase of my projects, and blog by Bona Brian Siagian.',
  url: 'https://bonabrian.com',
  // TODO: add image
  image: '',
  type: 'website',
  robots: 'follow, index',
}

type MetaProps = {
  templateTitle?: string
  date?: string
} & Partial<typeof defaultMeta>

const Meta = (props: MetaProps) => {
  const router = useRouter()
  const meta = {
    ...defaultMeta,
    ...props,
  }
  meta.date = props.date
  meta.title = props.templateTitle
    ? `${props.templateTitle} | ${meta.siteName}`
    : meta.title

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name='robots' content={meta.robots} />
      <meta name='description' content={meta.description} />
      <meta property='og:url' content={`${meta.url}${router.asPath}`} />
      <link rel='canonical' href={`${meta.url}${router.asPath}`} />
      {/* Open Graph */}
      <meta property='og:type' content={meta.type} />
      <meta property='og:site_name' content={meta.siteName} />
      <meta property='og:description' content={meta.description} />
      <meta property='og:title' content={meta.title} />
      <meta name='image' property='og:image' content={meta.image} />
      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@th_clarence' />
      <meta name='twitter:title' content={meta.title} />
      <meta name='twitter:description' content={meta.description} />
      <meta name='twitter:image' content={meta.image} />
      {meta.date && (
        <>
          <meta property='article:published_time' content={meta.date} />
          <meta
            name='published_date'
            property='og:publish_date'
            content={meta.date}
          />
          <meta
            name='author'
            property='article:author'
            content='Bona Brian Siagian'
          />
        </>
      )}
    </Head>
  )
}

export default Meta
