type DailyAnalyticsT = {
  ayahsRead?: number;
  finishedAzkar?: number;
  finishedTasks?: number;
  finishedDailyRemembers?: number;
};

export type AnalyticsT = Record<string, DailyAnalyticsT>;

export type IncreaseAnalyticsT =
  | 'finishedDailyRemembers'
  | 'finishedAzkar'
  | 'finishedTasks'
  | 'ayahsRead';

export type AnalyticsTypeT = 'day' | 'week' | 'month';
