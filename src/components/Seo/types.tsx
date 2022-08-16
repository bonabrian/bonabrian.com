type OpenGraph = 'website' | 'article'
export type MetaImageStyle = 'summary_large_image' | 'summary'
export type MetaColor = {
  color?: string
  schema?: string
}

export type SeoProps = {
  title?: string
  description?: string
  keywords?: string | Array<string> | null
  canonicalUrl?: string
  ogType?: OpenGraph
  image?: string
  metaImageStyle?: MetaImageStyle
}
