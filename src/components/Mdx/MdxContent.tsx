import { useMemo } from 'react'

import { formatDate } from '@/utils'

import type { Content, ContentFields, MdxContentProps } from './types'
import { ViewsCounter } from './ViewsCounter'

const getContentFields = (content: Content): ContentFields => {
  const fields: ContentFields = {
    title: content.title,
  }
  if ('slug' in content) fields.slug = content.slug
  if ('date' in content) fields.date = content.date
  if ('hero' in content) fields.hero = content.hero
  if ('heroMeta' in content) fields.heroMeta = content.heroMeta
  if ('readingTime' in content) fields.readingTime = content.readingTime
  if ('tags' in content) fields.tags = content.tags
  if ('draft' in content) fields.draft = content.draft

  return fields
}

export const MdxContent = ({ content, children }: MdxContentProps) => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { title, slug, date, hero, heroMeta, readingTime, tags, draft } =
    getContentFields(content)
  // eslint-disable-next-line unused-imports/no-unused-vars
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
      <article>
        <header className='pt-6 xl:pb-8'>
          <div className='space-1 text-center'>
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-semibold leading-9 sm:leading-10 md:leading-14 text-gray-900 dark:text-gray-100'>
              {title}
            </h1>
            <div className='mt-2 space-x-1 sm:space-x-2 text-gray-500 dark:text-gray-400 text-sm'>
              <span>{formatDate(date)}</span>
              <span>•</span>
              <span>{readingTime?.text}</span>
              <span>•</span>
              <ViewsCounter slug={slug} draft={draft} />
            </div>
          </div>
        </header>
        <div className='prose dark:prose-dark max-w-none'>{children}</div>
      </article>
    </div>
  )
}
