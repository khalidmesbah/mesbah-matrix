'use client';

import useCalendarStore from '@/lib/stores/calendar';
import Calendar from '../calendar';
import Tutorial from '../tutorial';
import ChangeCalendar from './change-calendar';
import PublicUrlInput from './public-url-input';

export default function Page() {
  const { src } = useCalendarStore();

  return (
    <div className='relative h-full'>
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
