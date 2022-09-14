import { useMemo } from 'react'

import { formatDate, getDomainFromUrl } from '@/utils'

import Divider from '../Divider'
import Link from '../Link'
import Tag from '../Tag'
import { Image } from './Image'
import type { ContentData, ContentFields, MdxContentProps } from './types'
import { ViewsCounter } from './ViewsCounter'

const getContentFields = (content: ContentData): ContentFields => {
  const fields: ContentFields = {
    title: content.title,
  }
  if ('description' in content) fields.description = content.description
  if ('slug' in content) fields.slug = content.slug
  if ('date' in content) fields.date = content.date
  if ('hero' in content) fields.hero = content.hero
  if ('heroMeta' in content) fields.heroMeta = content.heroMeta
  if ('heroSource' in content) fields.heroSource = content.heroSource
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
    hero,
    heroMeta,
    heroSource,
    readingTime,
    tags,
    draft,
  } = getContentFields(content)
  const extraHeroProps = useMemo(() => {
    if (heroMeta && heroMeta.blur64) {
      return {
        placeholder: 'blur',
        blurDataURL: heroMeta.blur64,
        width: heroMeta.size.width || 665,
        height: heroMeta.size.height || 375,
      }
    }
    return {}
  }, [heroMeta])

  return (
    <div className='flex flex-col min-h-screen'>
      {backHref && <Link href={backHref}>← Back</Link>}
      <article className='article'>
        <header className='pt-6 xl:pb-8'>
          <div className='space-1 text-center'>
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-semibold leading-9 sm:leading-10 md:leading-14 text-gray-900 dark:text-gray-100'>
              {title}
            </h1>
            {description && (
              <p className='text-gray-600 dark:text-gray-400'>{description}</p>
            )}
            <div className='my-2 space-x-1 sm:space-x-2 text-gray-500 dark:text-gray-400 text-sm flex justify-center items-center'>
              <span>{formatDate(date)}</span>
              <span>•</span>
              <span>{readingTime?.text}</span>
              <span>•</span>
              <ViewsCounter slug={slug} draft={draft} />
            </div>
          </div>
        </header>
        <div className='prose dark:prose-dark max-w-none'>
          {hero && (
            <figure>
              {/* @ts-ignore */}
              <Image
                src={hero || ''}
                alt={`Cover image for article "${title}"`}
                priority
                {...extraHeroProps}
                quality={100}
                layout='responsive'
              />
              {heroSource && (
                <figcaption className='text-gray-500 text-center'>
                  Source{' '}
                  <Link href={heroSource} title={heroSource}>
                    {getDomainFromUrl(heroSource)}
                  </Link>
                </figcaption>
              )}
            </figure>
          )}
          {children}
        </div>
        <footer>
          <Divider />
          <div className='text-sm font-medium leading-5 divide-gray-200 xl:divide-y dark:divide-gray-700 xl:col-start-1 xl:row-start-2'>
            {tags && (
              <div className='py-4'>
                <div className='flex flex-wrap'>
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
