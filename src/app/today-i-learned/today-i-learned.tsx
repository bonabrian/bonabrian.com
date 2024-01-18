import type { TIL } from 'contentlayer/generated'

import Mdx from '@/components/mdx'
import { EmptyState } from '@/components/ui'
import cn from '@/utils/cn'
import { formatDate } from '@/utils/date'

interface TodayILearnedProps {
  learns: TIL[]
}

const TodayILearned = ({ learns }: TodayILearnedProps) => {
  return learns.length ? (
    <>
      {learns.map(({ _id, date, body }) => (
        <div
          key={_id}
          className={cn('flex flex-row gap-6', 'md:gap-12', 'lg:gap-24')}
        >
          <div className={cn('hidden', 'md:block md:pb-24')}>
            <div
              className={cn(
                'relative top-0 mt-4 pt-1.5',
                'md:sticky md:top-[86px]',
              )}
            >
              <div className={cn('font-mono font-bold', 'md:text-right')}>
                <time className={cn('md:block', 'lg:hidden')} dateTime={date}>
                  {formatDate(date, 'yyyy-MM-dd')}
                </time>
                <time className={cn('md:hidden', 'lg:block')} dateTime={date}>
                  {formatDate(date)}
                </time>
              </div>
            </div>
          </div>
          <div className={cn('mr-px items-stretch border border-muted')} />
          <div
            className={cn(
              'flex min-w-0 flex-1 flex-col gap-16 py-8',
              'md:gap-0 md:py-4',
            )}
          >
            <article className={cn('md:pb-16')}>
              <div
                className={cn(
                  'pointer-events-none sticky top-[86px] -ml-8 pb-12',
                  'md:-ml-12',
                  'lg:-ml-24',
                )}
              >
                <div
                  className={cn(
                    'absolute -ml-0.5 mt-2.5 h-4 w-4 rounded-full bg-primary',
                    'md:-ml-3 md:mt-2 md:h-5 md:w-5',
                  )}
                />
              </div>
              <div className={cn('-mt-12')}>
                <div className={cn('prose max-w-full', 'dark:prose-dark')}>
                  <Mdx code={body?.code} />
                </div>
              </div>
            </article>
          </div>
        </div>
      ))}
    </>
  ) : (
    <EmptyState message="I need to learn something today." />
  )
}

export default TodayILearned
