'use client';

import ParticlesLoader from '@/components/particles-loader';
import { useCalendarQuery } from '@/lib/hooks/use-calendar';
import Calendar from '../calendar';
import Tutorial from '../tutorial';
import ChangeCalendar from './change-calendar';
import PublicUrlInput from './public-url-input';

export default function Page() {
  const { data, isLoading, isError, error } = useCalendarQuery();

  if (isLoading) return <ParticlesLoader />;
  if (isError) return <div>Error: {error?.message}</div>;
  const src = data?.publicURL as string;

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
