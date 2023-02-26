import { useMemo } from 'react'
import { RiCalendarLine, RiTimeLine } from 'react-icons/ri'
import type { IReadTimeResults } from 'reading-time'

import { formatDate, getDomainFromUrl } from '@/lib/utils'
import type { ImageMeta, Post, Snippet } from '@/types'

import Divider from '../divider'
import Link from '../link'
import Reactions from '../reactions'
import ShareArticle from '../share-article'
import Tag from '../tag'
import Image from './image'
import ViewsCounter from './views-counter'

// TODO: add Project content type
type ContentData = Post | Snippet

interface ContentFields {
  title: string
  description?: string
  slug: string
  date?: string
  image?: string
  imageMeta?: ImageMeta
  imageSource?: string
  readingTime?: IReadTimeResults | null
  tags?: Array<string>
  draft?: boolean
}

type MdxContentProps = {
  content: ContentData
  children?: React.ReactNode
}

const getContentFields = (content: ContentData): ContentFields => {
  const fields: ContentFields = {
    title: content.title,
    slug: content.slug,
  }
  if ('description' in content) fields.description = content.description
  if ('date' in content) fields.date = content.date || ''
  if ('image' in content) fields.image = content.image
  if ('imageMeta' in content) fields.imageMeta = content.imageMeta
  if ('imageSource' in content) fields.imageSource = content.imageSource
  if ('readingTime' in content) fields.readingTime = content.readingTime
  if ('tags' in content) fields.tags = content.tags
  if ('draft' in content) fields.draft = content.draft

  return fields
}

const MdxContent = ({ content, children }: MdxContentProps) => {
  const {
    title,
    description,
    slug,
    date,
    image,
    imageMeta,
    imageSource,
    readingTime,
    tags,
    draft,
  } = getContentFields(content)
  const extraImageProps = useMemo(() => {
    if (imageMeta && imageMeta.blur64) {
      return {
        placeholder: 'blur',
        blurDataURL: imageMeta.blur64,
      }
    }
    return {}
  }, [imageMeta])

  const createdAt = formatDate({ timestamp: date })

  return (
    <div className="flex flex-col">
      <article className="article">
        <div className="flex flex-col justify-center sm:items-center gap-y-4 my-4">
          <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl leading-9 sm:leading-10 md:leading-14 mb-0 tracking-tight mt-2">
            {title}
          </h1>
          {description && (
            <p className="text-sm sm:text-base text-gray-900/80 dark:text-white/80 sm:text-center">
              {description}
            </p>
          )}
          <div className="flex items-center flex-wrap text-xs gap-y-1 sm:gap-y-0 text-gray-900/50 dark:text-white/60">
            <div className="flex items-center space-x-1 after:content-['•'] after:inline-block after:align-middle after:mx-2 after:text-base">
              <RiCalendarLine />
              <span title={createdAt.raw}>{createdAt.formatted}</span>
            </div>
            <div className="flex items-center space-x-1 after:content-['•'] after:inline-block after:align-middle after:mx-2 after:text-base">
              <RiTimeLine />
              <span title="Estimated read time">{readingTime?.text}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ViewsCounter slug={slug} draft={draft} />
            </div>
          </div>
        </div>
        <div className="prose dark:prose-dark max-w-none">
          {image && (
            <>
              {/* @ts-ignore */}
              <Image
                src={image || ''}
                alt={`Cover image for article "${title}"`}
                fill
                priority
                className="object-cover"
                {...extraImageProps}
              />
              {imageSource && (
                <figcaption className="text-gray-900/50 dark:text-white/60">
                  Source{' '}
                  <Link href={imageSource} title={imageSource}>
                    {getDomainFromUrl(imageSource)}
                  </Link>
                </figcaption>
              )}
            </>
          )}
          {children}
        </div>
        <div>
          {tags && (
            <div className="flex flex-wrap gap-4 py-4">
              {tags.map((tag) => (
                <Tag key={tag} text={tag} />
              ))}
            </div>
          )}
          <div className="flex justify-between items-center my-4">
            <Reactions slug={slug} />
            <ShareArticle slug={slug} title={title} description={description} />
          </div>
          <Divider />
        </div>
      </article>
    </div>
  )
}

export default MdxContent
