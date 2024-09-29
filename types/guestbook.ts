import type { User } from './user';

export interface Guestbook {
  id: string;
  body: string;
  createdAt: string;
  user: User;
}
