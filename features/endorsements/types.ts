import type { User } from '@/types/user';

export interface Skill {
  id: string;
  name: string;
  users: User[];
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}
