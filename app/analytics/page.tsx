'use client';

import AyahsChart from '@/components/analytics/ayahs-chart';
import AzkarChart from '@/components/analytics/azkar-chart';
import DailyRemindersChart from '@/components/analytics/daily-reminders-chart';
import TasksChart from '@/components/analytics/tasks-chart';
import ParticlesLoader from '@/components/particles-loader';
import { Button } from '@/components/ui/button';
import { getAnalytics, increaseAnalytics } from '@/lib/server-actions/analytics';
import { Separator } from '@radix-ui/react-separator';
import { useQuery } from '@tanstack/react-query';

export default function Page() {
  const {
    data: analytics,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['analytics'],
    queryFn: () => getAnalytics(),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  if (isLoading)
    return (
      <div className="fc flex h-screen max-h-screen w-screen flex-col overflow-hidden">
        <ParticlesLoader />
      </div>
    );

  if (!analytics || isError) return <div>Not Analytics</div>;

  return (
    <div>
      <h1># Actions</h1>

      <div className="flex flex-wrap gap-2">
        <Button onClick={() => increaseAnalytics('finishedDailyRemembers')}>
          finish daily remember
        </Button>
        <Button onClick={() => increaseAnalytics('finishedTasks')}>finish finish task</Button>
        <Button onClick={() => increaseAnalytics('finishedAzkar')}>
          finish finish daily reminder
        </Button>
        <Button onClick={() => increaseAnalytics('ayahsRead')}>finish read ayah</Button>
      </div>

      <Separator className="my-4 h-1 rounded-full bg-primary" />

      <div className="gird-rows-auto grid grid-cols-fit gap-2">
        <TasksChart analytics={analytics} />
        <AyahsChart analytics={analytics} />
        <AzkarChart analytics={analytics} />
        <DailyRemindersChart analytics={analytics} />
      </div>
    </div>
  );
}
