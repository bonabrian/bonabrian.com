import type { User } from './user';

export interface Skill {
  id: string;
  name: string;
  users: User[];
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}
