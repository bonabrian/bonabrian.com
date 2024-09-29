export interface GitHubUser {
  avatar_url: string;
  url: string;
  gists_url: string;
  starred_url: string;
  repos_url: string;
  type: string;
  name: string;
  company: string | null;
  blog: string | null;
  followers: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubRepository {
  fork: boolean;
  stargazers_count: number;
}

export interface ContributionCalendar {
  colors: string[];
  totalContributions: number;
  months: {
    firstDay: string;
    name: string;
    totalWeeks: number;
  }[];
  weeks: {
    contributionDays: {
      color: string;
      contributionCount: number;
      date: string;
    }[];
    firstDay: string;
  }[];
}

export interface UserContributionsCollection {
  contributionsCollection: {
    contributionCalendar: ContributionCalendar;
  };
}
