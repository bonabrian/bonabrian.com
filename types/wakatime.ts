import type { APISingleResponse } from './server';

export interface WakaTimeSummary {
  name: string;
  total_seconds: number;
  percent: number;
  digital: number;
  decimal: number;
  text: string;
  hours: number;
  minutes: number;
}

export interface WakaTimeMachine extends WakaTimeSummary {
  machine_name_id: string;
}

export interface WakaTimeCategory extends WakaTimeSummary {}

export interface WakaTimeLanguage extends WakaTimeSummary {}

export interface WakaTimeOperatingSystem extends WakaTimeSummary {}

export interface WakaTimeEditor extends WakaTimeSummary {}

export interface WakaTimeProject extends WakaTimeSummary {}

export interface WakaTimeBestDay {
  id: string;
  date: string;
  total_seconds: number;
  created_at: string;
  modified_at: string;
  text: string;
}

export interface WakaTimeAllTimeSinceToday {
  total_seconds: number;
  text: string;
  decimal: number;
  digital: number;
  is_up_to_date: boolean;
  percent_calculated: number;
  range: {
    start: string;
    start_date: string;
    start_text: string;
    end: string;
    end_date: string;
    end_text: string;
    timezone: string;
  };
  timeout: number;
}

export interface WakaTimeStats {
  id?: string;
  user_id?: string;
  start?: string;
  end?: string;
  range?: string;
  timeout?: number;
  writes_only?: boolean;
  timezone?: string;
  holidays?: number;
  status?: string;
  created_at?: string;
  modified_at?: string;
  percent_calculated?: number;
  human_readable_total?: string;
  machines?: WakaTimeMachine[];
  daily_average?: number;
  is_up_to_date_pending_future?: boolean;
  total_seconds?: number;
  is_stuck?: boolean;
  categories?: WakaTimeCategory[];
  languages?: WakaTimeLanguage[];
  is_already_updating?: boolean;
  operating_systems?: WakaTimeOperatingSystem[];
  editors?: WakaTimeEditor[];
  projects?: WakaTimeProject[];
  days_minus_holidays?: number;
  human_readable_daily_average?: string;
  human_readable_daily_average_including_other_language?: string;
  days_including_holidays?: number;
  best_day?: WakaTimeBestDay;
  human_readable_total_including_other_language?: string;
  total_seconds_including_other_language?: number;
  is_up_to_date?: boolean;
  daily_average_including_other_language?: number;
  username?: string | null;
  is_including_today?: boolean;
  human_readable_range?: string;
  is_coding_activity_visible?: boolean;
  is_other_usage_visible?: boolean;
}

export interface WakaTimeResponse<D> extends APISingleResponse<D> {}
