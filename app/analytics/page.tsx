'use client';

import { useKindeAuth } from '@kinde-oss/kinde-auth-nextjs';
import { Separator } from '@radix-ui/react-separator';
import { useQuery } from '@tanstack/react-query';
import ParticlesLoader from '@/components/particles-loader';
import { Button } from '@/components/ui/button';
import { getAnalytics, increaseAnalytics } from '@/lib/server-actions/analytics';
import AuthRequired from './_components/auth-required';
import AyahsChart from './_components/ayahs-chart';
import AzkarChart from './_components/azkar-chart';
import DailyRemindersChart from './_components/daily-reminders-chart';
import TasksChart from './_components/tasks-chart';

export default function Page() {
  const { isAuthenticated } = useKindeAuth();

  const {
    data: analytics,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['analytics'],
    queryFn: () => getAnalytics(),
    staleTime: Number.POSITIVE_INFINITY,
    refetchOnWindowFocus: false,
  });

  if (!isAuthenticated) return <AuthRequired />;
  if (isLoading) return <ParticlesLoader />;

  if (isError || !analytics) return <div>No Analytics, ${JSON.stringify(error)}</div>;
  console.log(analytics);

  return (
    <>
      <h1># Actions</h1>

      <div className='flex flex-wrap gap-2'>
        <Button onClick={() => increaseAnalytics('finishedDailyRemembers')}>
          finish daily remember
        </Button>
        <Button onClick={() => increaseAnalytics('finishedTasks')}>finish finish task</Button>
        <Button onClick={() => increaseAnalytics('finishedAzkar')}>
          finish finish daily reminder
        </Button>
        <Button onClick={() => increaseAnalytics('ayahsRead')}>finish read ayah</Button>
      </div>

      <Separator className='bg-primary my-4 h-1 rounded-full' />

      <div className='gird-rows-auto grid-cols-fit grid gap-2'>
        <TasksChart analytics={analytics} />
        <AyahsChart analytics={analytics} />
        <AzkarChart analytics={analytics} />
        <DailyRemindersChart analytics={analytics} />
      </div>
    </>
  );
}
