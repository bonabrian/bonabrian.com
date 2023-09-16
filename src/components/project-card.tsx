import type { Project } from 'contentlayer/generated'
import Image from 'next/image'
import { useMemo } from 'react'

import cn from '@/lib/cn'
import { routes } from '@/lib/constants'

import {
  Android,
  Bootstrap,
  JavaScript,
  JQuery,
  Kotlin,
  Laravel,
  NextJs,
  PHP,
  PlanetScale,
  Prisma,
  ReactJs,
  Redis,
  TailwindCss,
  TypeScript,
  VueJs,
} from './icons'
import Link from './link'
import { Tooltip } from './ui'

interface StackProps {
  [key: string]: JSX.Element
}

const STACKS: StackProps = {
  TypeScript: <TypeScript className={cn('text-[#3178C6] w-6 h-6')} />,
  JavaScript: <JavaScript className={cn('text-[#F7DF1E] w-6 h-6')} />,
  'Next.js': <NextJs className={cn('text-black dark:text-white w-6 h-6')} />,
  'React.js': <ReactJs className={cn('text-[#61DAFB] w-6 h-6')} />,
  'Vue.js': <VueJs className={cn('text-[#4FC08D] w-6 h-6')} />,
  JQuery: <JQuery className={cn('text-[#0769AD] w-6 h-6')} />,
  TailwindCSS: <TailwindCss className={cn('text-[#06B6D4] w-6 h-6')} />,
  Bootstrap: <Bootstrap className={cn('text-[#7952B3] w-6 h-6')} />,
  Prisma: <Prisma className={cn('text-[#2D3748] dark:text-white w-6 h-6')} />,
  PlanetScale: (
    <PlanetScale className={cn('text-black dark:text-white w-6 h-6')} />
  ),
  PHP: <PHP className={cn('text-[#777BB4] w-6 h-6')} />,
  Laravel: <Laravel className={cn('text-[#FF2D20] w-6 h-6')} />,
  Redis: <Redis className={cn('text-[#DC382D] w-6 h-6')} />,
  Kotlin: <Kotlin className={cn('text-[#7F52FF] w-6 h-6')} />,
  Android: <Android className={cn('text-[#3DDC84] w-6 h-6')} />,
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

  let projectUrl = url ?? `${routes.PROJECTS}/${slug}`
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
