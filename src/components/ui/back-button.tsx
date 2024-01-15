'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import cn from '@/utils/cn'

import { ArrowLeftCircle } from '../icons'
import Container from './container'

interface BackButtonProps {
  href?: string
}

const BackButton = ({ href }: BackButtonProps) => {
  const router = useRouter()

  const className =
    'flex gap-2 w-max hover:gap-3 items-center transition-all duration-200 font-medium cursor-pointer'

  return (
    <Container className={cn('mt-4', 'md:mt-8')}>
      <div className={cn('w-fit')}>
        {href ? (
          <Link href={href} passHref className={cn(className)}>
            <ArrowLeftCircle />
            <span>Back</span>
          </Link>
        ) : (
          <div className={cn(className)} onClick={() => router.back()}>
            <ArrowLeftCircle />
            <span>Back</span>
          </div>
        )}
      </div>
    </Container>
  )
}

export default BackButton
