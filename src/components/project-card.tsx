import type { Project } from 'contentlayer/generated'
import Image from 'next/image'
import { useMemo } from 'react'

import { ROUTES } from '@/constants/links'
import { STACKS } from '@/constants/stacks'
import cn from '@/lib/cn'

import { Tooltip } from './common'
import Link from './link'

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
        'group flex flex-col h-full min-w-0 break-words rounded-md bg-card',
      )}
    >
      <Link
        href={projectUrl}
        showExternalLinkIcon={false}
        className={cn('aspect-video relative rounded-t-md overflow-hidden')}
      >
        <div className={cn('absolute w-full h-full')} />
        <Image
          src={image ?? ''}
          alt={title}
          fill
          className={cn(
            'object-cover rounded-t-md group-hover:scale-105 transition duration-200 ease-in-out',
          )}
          sizes="(max-width: 768px) 100vw, 50vw"
          {...extraImageProps}
        />
      </Link>
      <div className={cn('p-6 flex flex-col')}>
        <Link href={projectUrl} showExternalLinkIcon={false}>
          <h2 className={cn('font-semibold text-lg mb-1 text-card-foreground')}>
            {title}
          </h2>
        </Link>
        <p className={cn('text-sm text-muted-foreground')}>{description}</p>
        {stacks?.length && (
          <div className={cn('flex flex-wrap items-center gap-2 mt-4')}>
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
