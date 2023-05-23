'use client'

import type { Project } from 'contentlayer/generated'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useMemo } from 'react'

import { routes } from '@/lib/constants'

import Link from './link'

const ProjectCard = ({ project }: { project: Project }) => {
  const { title, slug, description, image, imageMeta, url, playStoreUrl } =
    project

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
    <motion.div
      layout
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
    >
      <div className="group flex flex-col h-full min-w-0 break-words rounded-lg bg-white/30 dark:bg-black/10">
        <Link
          href={projectUrl}
          showExternalLinkIcon={false}
          className="aspect-video relative rounded-t-lg overflow-hidden"
        >
          <div className="absolute w-full h-full" />
          <Image
            src={image ?? ''}
            alt={title}
            fill
            className="object-cover rounded-t-lg group-hover:scale-105 transition duration-500 ease-in-out"
            sizes="(max-width: 768px) 100vw, 50vw"
            {...extraImageProps}
          />
        </Link>
        <div className="p-6 flex flex-col">
          <Link
            href={projectUrl}
            showExternalLinkIcon={false}
            className="text-md sm:text-lg md:text-xl font-semibold tracking-tighter"
          >
            {title}
          </Link>
          <p className="text-base text-gray-900/50 dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard
