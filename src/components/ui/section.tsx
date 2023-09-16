import cn from '@/lib/cn'

import Container from '../container'

interface SectionProps {
  title: string
  subtitle: string
  children: React.ReactNode
}

const Section = ({ title, subtitle, children }: SectionProps) => {
  return (
    <div className={cn('mb-12')}>
      <Container>
        <h2 className={cn('font-bold mb-2')}>{title}</h2>
        <p
          className={cn(
            'mb-4 font-bold text-gray-700 text-xl',
            'md:text-2xl',
            'dark:text-slate-50',
          )}
        >
          {subtitle}
        </p>
        {children}
      </Container>
    </div>
  )
}

export default Section
