import type { Project } from 'contentlayer/generated'
import Image from 'next/image'
import { useMemo } from 'react'

import { STACKS } from '@/constants/stacks'
import { ROUTES } from '@/data/app'
import cn from '@/lib/cn'

import { Link, Tooltip } from './ui'

const ProjectCard = ({ project }: { project: Project }) => {
  const {
    title,
    slug,
    description,
    image,
    imageMeta,
    url,
    playStoreUrl,
    stacks,
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

  let projectUrl = url ?? `${ROUTES.projects}/${slug}`
  if (playStoreUrl) projectUrl = playStoreUrl

  return (
    <div
      className={cn(
        'group flex h-full min-w-0 flex-col break-words rounded-md bg-card',
      )}
    >
      <Link
        href={projectUrl}
        showExternalLinkIcon={false}
        className={cn('relative aspect-video overflow-hidden rounded-t-md')}
      >
        <div className={cn('absolute h-full w-full')} />
        <Image
          src={image ?? ''}
          alt={title}
          fill
          className={cn(
            'rounded-t-md object-cover transition duration-200 ease-in-out group-hover:scale-105',
          )}
          sizes="(max-width: 768px) 100vw, 50vw"
          {...extraImageProps}
        />
      </Link>
      <div className={cn('flex flex-col p-6')}>
        <Link href={projectUrl} showExternalLinkIcon={false}>
          <h2 className={cn('mb-1 text-lg font-semibold text-card-foreground')}>
            {title}
          </h2>
        </Link>
        <p className={cn('text-sm text-muted-foreground')}>{description}</p>
        {stacks?.length && (
          <div className={cn('mt-4 flex flex-wrap items-center gap-2')}>
            {stacks?.map((stack) => (
              <Tooltip key={stack} title={stack}>
                {STACKS[stack]}
              </Tooltip>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectCard
