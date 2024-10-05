'use client';

import Calendar from '@/components/calendar/calendar';
import Tutorial from '@/components/calendar/tutorial';
import ChangeCalendar from '@/components/calendar/user/change-calendar';
import PublicUrlInput from '@/components/calendar/user/public-url-input';
import ParticlesLoader from '@/components/particles-loader';
import { useCalendarQuery } from '@/lib/hooks/use-calendar';

export default function Page() {
  const { data, isLoading, isError, error } = useCalendarQuery();

  if (isLoading)
    return (
      <div className="fc h-full w-full">
        <ParticlesLoader />
      </div>
    );
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
        <Tutorial>
          <PublicUrlInput />
        </Tutorial>
      )}
    </div>
  );
}
