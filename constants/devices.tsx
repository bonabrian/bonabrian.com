import { Laptop, Smartphone } from '@/components/shared/icons';
import { cn } from '@/lib/utils';

export const PAIR_DEVICES: Record<
  string,
  { icon: React.ReactNode; model: string; id: string }
> = {
  Computer: {
    icon: <Laptop className={cn('size-6')} />,
    model: 'Macbook Air',
    id: 'bonabrian-macbook-air',
  },
  Smartphone: {
    icon: <Smartphone className={cn('size-6')} />,
    model: 'iPhone 11',
    id: 'bonabrian-iphone',
  },
};
