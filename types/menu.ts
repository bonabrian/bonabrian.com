import type { JSX } from 'react';

export interface NavLink {
  path: string;
  label: string;
  icon: JSX.Element;
  onlyShowOnDropdownMenu?: boolean;
}

export interface CommandMenu {
  label: string;
  href: string;
  icon: JSX.Element;
  isExternal: boolean;
  type: 'PAGE' | 'LINK' | 'CONTACT' | 'APPEARANCE';
  eventName?: string;
  onClick?: () => void;
  closeOnSelect?: boolean;
}
