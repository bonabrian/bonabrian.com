import { motion } from 'framer-motion'
import Image from 'next/image'
import { useMemo } from 'react'

import Link from '../Link'
import type { ProjectCardProps } from './types'

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { title, slug, description, image, imageMeta, url } = project

  const extraImageProps = useMemo(() => {
    if (imageMeta && imageMeta.blur64) {
      return { placeholder: 'blur', blurDataURL: imageMeta?.blur64 } as {
        placeholder: 'blur' | 'empty'
        blurDataURL?: string
      }
    }
    return {}
  }, [imageMeta])

  return (
    <motion.div
      layout
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
    >
      <Link href={url || `/projects/${slug}`} showExternalLinkIcon={false}>
        <div className="relative hover:scale-105 transform duration-300">
          <Image
            src={image || ''}
            alt={`Thumbnail "${title}"`}
            width={600}
            height={800}
            {...extraImageProps}
            className="rounded-lg h-5"
            objectFit="cover"
          />
          <div className="absolute bottom-0 right-0 p-6 text-right">
            <h1 className="mb-0 text-2xl font-bold leading-8 tracking-tight text-white">
              {title}
            </h1>
            <p className="mb-0 text-gray-100">{description}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProjectCard
