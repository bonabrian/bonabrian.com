'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';

import Guestbook from '@/app/guestbook/guestbook';
import { ROUTES } from '@/constants';
import { cn } from '@/lib/utils';

import { BookOpenText } from '../shared/icons';
import RenderIf from '../shared/render-if';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import WidgetHeader from './widget-header';

const GuestbookWidget = () => {
  const pathname = usePathname();
  const showWidgetButton = !pathname.startsWith(ROUTES.guestbook);
  const [isShowWidget, setIsShowWidget] = useState(false);

  return (
    <RenderIf isTrue={showWidgetButton}>
      <Popover open={isShowWidget} onOpenChange={setIsShowWidget}>
        <PopoverTrigger
          asChild
          className={cn(
            'fixed right-5 bottom-10 z-10 hidden items-center',
            'md:flex',
          )}
        >
          <Button variant="shadow" className={cn('size-10 rounded-full p-0')}>
            <BookOpenText />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className={cn('mb-2 w-[28rem] p-0')}>
          <WidgetHeader onClose={() => setIsShowWidget(false)} />
          <Guestbook isWidget />
        </PopoverContent>
      </Popover>
    </RenderIf>
  );
};

export default GuestbookWidget;
