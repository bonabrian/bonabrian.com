'use client';

import { BookOpenTextIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ROUTES } from '@/constants/routes';

import Guestbook from './guestbook';
import WidgetHeader from './widget-header';

const GuestbookWidget = () => {
  const pathname = usePathname();
  const showWidgetButton = useMemo((): boolean => {
    return !pathname.startsWith(ROUTES.guestbook);
  }, [pathname]);

  const [isWidgetOpen, setIsWidgetOpen] = useState(false);

  if (!showWidgetButton) return null;

  return (
    <Popover open={isWidgetOpen} onOpenChange={setIsWidgetOpen}>
      <PopoverTrigger
        asChild
        className="fixed right-5 bottom-10 z-10 hidden items-center md:flex"
      >
        <Button variant="shadow" className="size-10 rounded-full p-0">
          <BookOpenTextIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="mb-2 w-md p-0">
        <WidgetHeader onClose={() => setIsWidgetOpen(false)} />
        <Guestbook isWidget />
      </PopoverContent>
    </Popover>
  );
};

export default GuestbookWidget;
