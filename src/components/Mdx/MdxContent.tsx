import { useMemo } from 'react'

import { formatDate, getDomainFromUrl } from '@/utils'

import Divider from '../Divider'
import Link from '../Link'
import { Tag } from '../Tag'
import { Image } from './Image'
import type { ContentData, ContentFields, MdxContentProps } from './types'
import { ViewsCounter } from './ViewsCounter'

const getContentFields = (content: ContentData): ContentFields => {
  const fields: ContentFields = {
    title: content.title,
  }
  if ('description' in content) fields.description = content.description
  if ('slug' in content) fields.slug = content.slug
  if ('date' in content) fields.date = content.date || ''
  if ('image' in content) fields.image = content.image
  if ('imageMeta' in content) fields.imageMeta = content.imageMeta
  if ('imageSource' in content) fields.imageSource = content.imageSource
  if ('readingTime' in content) fields.readingTime = content.readingTime
  if ('tags' in content) fields.tags = content.tags
  if ('draft' in content) fields.draft = content.draft

  return fields
}

export const MdxContent = ({
  backHref,
  content,
  children,
}: MdxContentProps) => {
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
        width: imageMeta.size.width || 665,
        height: imageMeta.size.height || 375,
      }
    }
    return {}
  }, [imageMeta])

  const createdAt = formatDate({ timestamp: date })

  return (
    <div className="flex flex-col min-h-screen">
      {backHref && <Link href={backHref}>← Back</Link>}
      <article className="article">
        <header className="pt-6 xl:pb-8">
          <div className="space-1 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-9 sm:leading-10 md:leading-14 text-gray-900 dark:text-gray-100">
              {title}
            </h1>
            {description && (
              <p className="text-gray-600 dark:text-gray-400">{description}</p>
            )}
            <div className="my-2 space-x-1 sm:space-x-2 text-gray-500 dark:text-gray-400 text-sm flex justify-center items-center">
              {date && (
                <>
                  <span title={createdAt.raw}>{createdAt.formatted}</span>
                  <span>•</span>
                </>
              )}
              <span>{readingTime?.text}</span>
              <span>•</span>
              <ViewsCounter slug={slug} draft={draft} />
            </div>
          </div>
        </header>
        <div className="prose dark:prose-dark max-w-none">
          {image && (
            <figure>
              {/* @ts-ignore */}
              <Image
                src={image || ''}
                alt={`Cover image for article "${title}"`}
                priority
                {...extraImageProps}
                quality={100}
                layout="responsive"
              />
              {imageSource && (
                <figcaption className="text-gray-500 text-center">
                  Source{' '}
                  <Link href={imageSource} title={imageSource}>
                    {getDomainFromUrl(imageSource)}
                  </Link>
                </figcaption>
              )}
            </figure>
          )}
          {children}
        </div>
        <footer>
          <Divider />
          <div className="text-sm font-medium leading-5 divide-gray-200 xl:divide-y dark:divide-gray-700 xl:col-start-1 xl:row-start-2">
            {tags && (
              <div className="py-4">
                <div className="flex flex-wrap">
                  {tags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </footer>
      </article>
    </div>
  )
}
