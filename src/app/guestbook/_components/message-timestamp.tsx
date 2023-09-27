import { format, formatDistanceToNow, isToday } from 'date-fns'
import { useEffect, useState } from 'react'

import cn from '@/lib/cn'

interface MessageTimestampProps {
  datetime: string
}

const MessageTimestamp = ({ datetime }: MessageTimestampProps) => {
  const [formattedTimestamp, setFormattedTimestamp] = useState<string>(
    formatDistanceToNow(new Date(datetime), { addSuffix: true }),
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setFormattedTimestamp(
        formatDistanceToNow(new Date(datetime), { addSuffix: true }),
      )
    }, 60_000)

    return () => clearInterval(interval)
  }, [datetime])

  return (
    <div className={cn('text-muted-foreground text-xs')}>
      {isToday(new Date(datetime))
        ? formattedTimestamp
        : format(new Date(datetime), 'dd MMM yyyy HH:mm')}
    </div>
  )
}

export default MessageTimestamp
