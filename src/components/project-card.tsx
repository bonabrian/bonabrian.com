'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useMemo } from 'react'

import { routes } from '@/lib/constants'
import type { Project } from '@/types'

import Link from './link'

interface ProjectCardProps {
  project: Project
}

const ProjectTag = ({ category }: { category: string }) => {
  return (
    <span className="font-bold uppercase text-primary-500 text-xs my-4 drop-shadow-[2px_2px_rgb(255_87_187_/_20%)] dark:drop-shadow-[1px_1px_rgb(245_100_169_/_60%)]">
      {category}
    </span>
  )
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { title, slug, description, image, imageMeta, category, url } = project

  const extraImageProps = useMemo(() => {
    if (image && imageMeta?.blur64) {
      return { placeholder: 'blur', blurDataURL: imageMeta?.blur64 } as {
        placeholder: 'blur' | 'empty'
        blurDataURL?: string
      }
    }
    return {}
  }, [image, imageMeta])

  const projectUrl = url ?? `${routes.PROJECTS}/${slug}`

  return (
    <motion.div
      layout
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
    >
      <div className="group flex flex-col h-full min-w-0 break-words rounded-3xl bg-white/30 dark:bg-black/10">
        <Link
          href={projectUrl}
          showExternalLinkIcon={false}
          className="aspect-square relative rounded-t-3xl overflow-hidden bg-no-repeat bg-cover"
        >
          <div className="absolute w-full h-full" />
          <Image
            src={image ?? ''}
            alt={title}
            fill
            className="object-cover rounded-t-3xl group-hover:scale-110 transition duration-500 ease-in-out"
            sizes="(max-width: 768px) 100vw, 50vw"
            {...extraImageProps}
          />
        </Link>
        <div className="p-6 flex flex-col">
          <ProjectTag category={category} />
          <Link
            href={projectUrl}
            showExternalLinkIcon={false}
            className="text-md sm:text-lg md:text-xl font-semibold tracking-tighter"
          >
            {title}
          </Link>
          <p className="text-base text-gray-900/50 dark:text-white/60 mt-4">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard
