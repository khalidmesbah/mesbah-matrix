'use client';

import ChangeCalendar from '@/components/calendar/anon/change-calendar';
import Tutorial from '@/components/calendar/anon/tutorial';
import Calendar from '@/components/calendar/calendar';
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
        <Tutorial />
      )}
    </div>
  );
}
