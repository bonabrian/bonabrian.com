'use client'

import PageHeader from '@/components/page-header'
import { BackButton, Container } from '@/components/ui'
import useView from '@/hooks/use-view'
import cn from '@/utils/cn'

interface HeaderProps {
  title: string
  slug: string
  date: string
  description?: string
}

const Header = ({ title, slug, description, date }: HeaderProps) => {
  useView({ slug, trackView: true })

  return (
    <>
      <BackButton />
      <PageHeader title={title} description={description} />
      <Container>
        <div
          className={cn(
            'flex flex-col justify-between gap-2 text-sm font-medium text-muted-foreground',
            'sm:flex-row',
          )}
        >
          <div>
            Published on
            <time dateTime={date} className={cn('px-1')}>
              {date}
            </time>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Header
