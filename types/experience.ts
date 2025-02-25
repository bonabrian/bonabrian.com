import type { JSX } from 'react';

export interface Company {
  name: string;
  logo: string;
  url: string;
  location: string;
  workplaceType: 'Remote' | 'Hybrid' | 'On-Site';
  jobType: 'Full-time' | 'Freelance';
}

export interface Stack {
  name: string;
  icon?: JSX.Element;
}

export interface Experience {
  company: Company;
  role: string;
  startDate: string;
  endDate: string | null;
  stacks: Stack[];
  accomplishments: string[];
}
