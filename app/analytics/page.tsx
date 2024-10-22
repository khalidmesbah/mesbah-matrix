'use client';

import ParticlesLoader from '@/components/particles-loader';
import { Button } from '@/components/ui/button';
import { getAnalytics, increaseAnalytics } from '@/lib/server-actions/analytics';
import { Separator } from '@radix-ui/react-separator';
import { useQuery } from '@tanstack/react-query';
import AyahsChart from './_components/ayahs-chart';
import AzkarChart from './_components/azkar-chart';
import DailyRemindersChart from './_components/daily-reminders-chart';
import TasksChart from './_components/tasks-chart';

export default function Page() {
  const {
    data: analytics,
    isLoading,
    isError,
    error,
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

  if (isError || !analytics) return <div>No Analytics, ${JSON.stringify(error)}</div>;
  console.log(analytics);

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
