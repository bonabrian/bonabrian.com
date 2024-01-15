'use client'

import type { Project } from 'contentlayer/generated'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'

import { ROUTES } from '@/config/links'
import { STACKS } from '@/constants/stacks'
import cn from '@/utils/cn'

import { Tooltip } from './ui'

const ProjectCard = ({ project }: { project: Project }) => {
  const {
    _id,
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

  const [isLoadingImage, setIsLoadingImage] = useState(true)

  return (
    <Link
      key={_id}
      href={projectUrl}
      className={cn(
        'group rounded-xl bg-card shadow-border transition-colors duration-200',
      )}
    >
      <div
        className={cn(
          'relative aspect-video w-full overflow-hidden bg-cover bg-no-repeat',
          isLoadingImage && 'animate-pulse',
        )}
      >
        <div className={cn('absolute h-full w-full')} />
        <Image
          src={image ?? ''}
          alt={title}
          fill
          className={cn(
            'rounded-xl object-cover transition duration-200 ease-in-out',
            isLoadingImage && 'scale-[1.01] blur-xl grayscale',
          )}
          sizes="(max-width: 768px) 100vw, 50vw"
          onLoad={() => setIsLoadingImage(false)}
          priority
          {...extraImageProps}
        />
      </div>
      <div
        className={cn(
          'flex flex-col p-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5',
        )}
      >
        <h2
          className={cn(
            'font-cal text-lg font-bold text-card-foreground',
            'md:text-xl',
          )}
        >
          {title}
        </h2>
        <p className={cn('mt-2 text-muted-foreground')}>{description}</p>
      </div>
      {stacks?.length && (
        <div className={cn('mt-2 flex flex-wrap items-center gap-2 px-4 pb-4')}>
          {stacks.map((stack) => (
            <Tooltip key={stack} title={stack}>
              {STACKS[stack]}
            </Tooltip>
          ))}
        </div>
      )}
    </Link>
  )
}

export default ProjectCard
