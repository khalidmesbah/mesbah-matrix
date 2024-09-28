'use client';

import ChangeCalendar from '@/components/calendar/anon/change-calendar';
import PublicUrlInput from '@/components/calendar/anon/public-url-input';
import Calendar from '@/components/calendar/calendar';
import Tutorial from '@/components/calendar/tutorial';
import useCalendarStore from '@/lib/stores/calendar';

export default function Page() {
  const { src } = useCalendarStore();

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
