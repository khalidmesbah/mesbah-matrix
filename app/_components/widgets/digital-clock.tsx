'use client';

import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DigitalClock() {
  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    return time.toLocaleTimeString('en-US', {
      hour12: !is24Hour,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formattedDate = time.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className='text-card-foreground p-2'>
      <div className='mb-2 flex items-center justify-between'>
        <Clock className='text-primary h-8 w-8' />
        <button
          onClick={() => setIs24Hour(!is24Hour)}
          className='bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm font-medium transition-all hover:scale-105'
        >
          {is24Hour ? '12H' : '24H'}
        </button>
      </div>

      <div className='text-center'>
        <div className='text-primary text-4xl font-bold tracking-wider'>{formatTime()}</div>
        <div className='text-muted-foreground text-lg'>{formattedDate}</div>
      </div>
    </div>
  );
}
