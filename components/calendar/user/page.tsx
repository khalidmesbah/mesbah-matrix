'use client';

import Calendar from '@/components/calendar/calendar';
import ChangeCalendar from '@/components/calendar/user/change-calendar';
import Tutorial from '@/components/calendar/user/tutorial';
import { useCalendarQuery } from '@/lib/hooks/use-calendar';

export default function Page() {
  const { data, isLoading, isError, error } = useCalendarQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;
  const src = data?.publicURL as string;

  return (
    <div className="relative h-full">
      {src ? (
        <>
          <Calendar src={src} />
          <ChangeCalendar src={src} />
        </>
      ) : (
        <Tutorial />
      )}
    </div>
  );
}
