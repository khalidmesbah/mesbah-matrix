import type {
  ANALYTICS__FINISHED_AZKAR,
  ANALYTICS_AYAHS_READ,
  ANALYTICS_FINISHED_DAILY_REMEMBERS,
  ANALYTICS_FINISHED_TASKS,
} from '@/lib/constants';

export type AnalyticT = {
  date: string;
  ayahsRead?: number;
  finishedAzkar?: number;
  finishedDailyRemembers?: number;
  finishedTasks?: number;
};

export type AnalyticsT = AnalyticT[];

export type IncreaseAnalyticsT =
  | typeof ANALYTICS_FINISHED_TASKS
  | typeof ANALYTICS_AYAHS_READ
  | typeof ANALYTICS_FINISHED_DAILY_REMEMBERS
  | typeof ANALYTICS__FINISHED_AZKAR;

export type AnalyticsTypeT = 'day' | 'week' | 'month';
