import { UserContributionsCollection } from './github';
import { WakaTimeAllTimeSinceToday, WakaTimeStats } from './wakatime';

export interface EngagementStats {
  views: number;
  reactions: number;
  endorsements: number;
}

export interface CodingActivityStats extends WakaTimeStats {
  all_time_since_today: WakaTimeAllTimeSinceToday;
}

export interface GitHubStats {
  followers: number;
  stars: number;
  contributions: UserContributionsCollection;
}
