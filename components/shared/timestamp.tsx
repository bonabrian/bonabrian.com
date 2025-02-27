'use client';

import { format, formatDistanceToNow, isToday } from 'date-fns';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const Timestamp = ({
  datetime,
  className,
}: {
  datetime: string;
  className?: string;
}) => {
  const [formatted, setFormatted] = useState(
    formatDistanceToNow(new Date(datetime), { addSuffix: true }),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setFormatted(
        formatDistanceToNow(new Date(datetime), { addSuffix: true }),
      );
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [datetime]);

  return (
    <div className={cn('text-muted-foreground text-xs', className)}>
      {isToday(new Date(datetime))
        ? formatted
        : format(new Date(datetime), 'dd MMM yyyy HH:mm')}
    </div>
  );
};

export default Timestamp;
