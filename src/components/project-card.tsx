import type { Project } from 'contentlayer/generated'
import Image from 'next/image'
import { useMemo } from 'react'

import cn from '@/lib/cn'
import { routes } from '@/lib/constants'

import Link from './link'

const getProjectCategoryClasses = (category: string): string => {
  if (category === 'personal') {
    return 'bg-primary-100 text-primary-600 dark:bg-primary-600/20 dark:text-primary-300'
  }

  return 'bg-blue-100 text-blue-700 dark:bg-blue-600/20 dark:text-blue-300'
}

const ProjectCard = ({ project }: { project: Project }) => {
  const {
    title,
    slug,
    description,
    image,
    imageMeta,
    url,
    playStoreUrl,
    category,
  } = project

  const extraImageProps = useMemo(() => {
    if (image && imageMeta?.blur64) {
      return { placeholder: 'blur', blurDataURL: imageMeta?.blur64 } as {
        placeholder: 'blur' | 'empty'
        blurDataURL?: string
      }
    }
    return {}
  }, [image, imageMeta])

  let projectUrl = url ?? `${routes.PROJECTS}/${slug}`
  if (playStoreUrl) projectUrl = playStoreUrl

  return (
    <div
      className={cn(
        'group flex flex-col h-full min-w-0 break-words border border-slate-100 rounded-lg bg-white',
        'dark:bg-gray-900 dark:border-gray-800',
      )}
    >
      <Link
        href={projectUrl}
        showExternalLinkIcon={false}
        className={cn('aspect-video relative rounded-t-lg overflow-hidden')}
      >
        <div className={cn('absolute w-full h-full')} />
        <Image
          src={image ?? ''}
          alt={title}
          fill
          className={cn(
            'object-cover rounded-t-lg group-hover:scale-105 transition duration-200 ease-in-out',
          )}
          sizes="(max-width: 768px) 100vw, 50vw"
          {...extraImageProps}
        />
      </Link>
      <div className={cn('p-6 flex flex-col')}>
        <Link href={projectUrl} showExternalLinkIcon={false}>
          <h2
            className={cn(
              'font-semibold text-lg text-gray-700 mb-1',
              'dark:text-slate-50',
            )}
          >
            {title}
          </h2>
        </Link>
        <p className={cn('text-sm mb-4 text-gray-600', 'dark:text-slate-200')}>
          {description}
        </p>
        <div className={cn('flex text-xs font-semibold')}>
          <div
            className={cn(
              'rounded-full px-2 py-0.5 capitalize',
              getProjectCategoryClasses(category),
            )}
          >
            {category}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
