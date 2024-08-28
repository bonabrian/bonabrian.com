import {
  AtSign,
  BookOpenText,
  Coffee,
  Dashboard,
  Email,
  FileCode,
  GitHub,
  Home,
  LinkedIn,
  Medal,
  Pencil,
  Twitter,
} from '@/components/shared/icons';
import type { CommandMenu, NavLink } from '@/types/menu';

import { SITE } from './site';

export const ROUTES = {
  blog: '/blog',
  projects: '/projects',
  notes: '/notes',
  tags: '/tags',
  endorsements: '/endorsements',
  guestbook: '/guestbook',
  about: '/about',
  dashboard: '/dashboard',
  resume: '/resume',
  todayILearned: '/today-i-learned',
};

export const NAV_LINKS: NavLink[] = [
  {
    path: '/',
    label: 'Home',
    icon: <Home />,
    onlyShowOnDropdownMenu: true,
  },
  {
    path: ROUTES.blog,
    label: 'Blog',
    icon: <Pencil />,
  },
  {
    path: ROUTES.projects,
    label: 'Projects',
    icon: <Coffee />,
  },
  {
    path: ROUTES.dashboard,
    label: 'Dashboard',
    icon: <Dashboard />,
  },
  {
    path: ROUTES.notes,
    label: 'Notes',
    icon: <FileCode />,
    onlyShowOnDropdownMenu: true,
  },
  {
    path: ROUTES.guestbook,
    label: 'Guestbook',
    icon: <BookOpenText />,
  },
  {
    path: ROUTES.endorsements,
    label: 'Endorsements',
    icon: <Medal />,
  },
  {
    path: ROUTES.about,
    label: 'About',
    icon: <AtSign />,
  },
];

export const COMMAND_PAGES: CommandMenu[] = [
  {
    label: 'Home',
    href: '/',
    icon: <Home />,
    isExternal: false,
    eventName: 'Pages: Home',
    type: 'PAGE',
    closeOnSelect: true,
  },
  {
    label: 'Blog',
    href: ROUTES.blog,
    icon: <Pencil />,
    isExternal: false,
    eventName: 'Pages: Blog',
    type: 'PAGE',
    closeOnSelect: true,
  },
  {
    label: 'Projects',
    href: ROUTES.projects,
    icon: <Coffee />,
    isExternal: false,
    eventName: 'Pages: Projects',
    type: 'PAGE',
  },
  {
    label: 'Dashboard',
    href: ROUTES.dashboard,
    icon: <Dashboard />,
    isExternal: false,
    eventName: 'Pages: Dashboard',
    type: 'PAGE',
    closeOnSelect: true,
  },
  {
    label: 'Notes',
    href: ROUTES.notes,
    icon: <FileCode />,
    isExternal: false,
    eventName: 'Pages: Notes',
    type: 'PAGE',
    closeOnSelect: true,
  },
  {
    label: 'Guestbook',
    href: ROUTES.guestbook,
    icon: <BookOpenText />,
    isExternal: false,
    eventName: 'Pages: Guestbook',
    type: 'PAGE',
    closeOnSelect: true,
  },
  {
    label: 'Endorsements',
    href: ROUTES.endorsements,
    icon: <Medal />,
    isExternal: false,
    eventName: 'Pages: Endorsements',
    type: 'PAGE',
    closeOnSelect: true,
  },
  {
    label: 'About',
    href: ROUTES.about,
    icon: <AtSign />,
    isExternal: false,
    eventName: 'Pages: About',
    type: 'PAGE',
    closeOnSelect: true,
  },
];
export const COMMAND_SOCIAL_MEDIA: CommandMenu[] = [
  {
    label: 'Email',
    href: `mailto:${SITE.author.email}`,
    icon: <Email />,
    isExternal: true,
    eventName: 'Contact: Email',
    type: 'CONTACT',
  },
  {
    label: 'GitHub',
    href: SITE.author.github.url,
    icon: <GitHub />,
    isExternal: true,
    eventName: 'Social: GitHub',
    type: 'LINK',
  },
  {
    label: 'LinkedIn',
    href: SITE.author.linkedIn,
    icon: <LinkedIn />,
    isExternal: true,
    eventName: 'Social: LinkedIn',
    type: 'LINK',
  },
  {
    label: 'X',
    href: SITE.author.twitter ?? '',
    icon: <Twitter />,
    isExternal: true,
    eventName: 'Social: X',
    type: 'LINK',
  },
];
export const COMMAND_APPEARANCE = [];
