import {
  getGitHubUser,
  getGitHubUserContributions,
  getGitHubUserRepositories,
} from '@/actions/github';
import { response } from '@/lib/server';
import type { APIErrorResponse, APISingleResponse } from '@/types/server';
import type { GitHubStats } from '@/types/stats';

export const dynamic = 'force-dynamic';

export const GET = async () => {
  try {
    const user = await getGitHubUser();
    const repositories = await getGitHubUserRepositories();
    const contributions = await getGitHubUserContributions();

    const mine = repositories.filter((repo) => !repo.fork);
    const stars: number = mine.reduce((acc: number, repo) => {
      const { stargazers_count: stargazers = 0 } = repo;
      return acc + stargazers;
    }, 0);

    return response<APISingleResponse<GitHubStats>>({
      data: {
        followers: user.followers,
        stars,
        contributions,
      },
    });
  } catch (error) {
    return response<APIErrorResponse>({
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};
