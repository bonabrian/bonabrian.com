import { Document } from '@/components/icons'
import { Button, Link } from '@/components/ui'
import cn from '@/lib/cn'

const DownloadResume = () => {
  return (
    <Link href="/resume/download">
      <Button variant="outline" className={cn('gap-x-1')}>
        <Document /> Download Resume
      </Button>
    </Link>
  )
}

export default DownloadResume
