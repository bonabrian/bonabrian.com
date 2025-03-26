import { LaptopIcon, SmartphoneIcon } from 'lucide-react';

export const pairDevices: Record<
  string,
  { icon: React.ReactNode; model: string; id: string }
> = {
  Computer: {
    icon: <LaptopIcon className="size-5" />,
    model: 'Macbook Air',
    id: 'bonabrian-macbook-air',
  },
  Smartphone: {
    icon: <SmartphoneIcon className="size-5" />,
    model: 'iPhone 11',
    id: 'bonabrian-iphone',
  },
};
