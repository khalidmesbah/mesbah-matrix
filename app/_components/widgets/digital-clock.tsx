'use client';

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DigitalClock({ id }: { id: string }) {
  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(false);
  const { isAuthenticated } = useKindeBrowserClient();

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
    <div className="p-2 text-card-foreground">
      <div className="mb-2 flex items-center justify-between">
        <Clock className="h-8 w-8 text-primary" />
        <button
          onClick={() => setIs24Hour(!is24Hour)}
          className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground transition-all hover:scale-105"
        >
          {is24Hour ? '12H' : '24H'}
        </button>
      </div>

      <div className="text-center">
        <div className="text-4xl font-bold tracking-wider text-primary">{formatTime()}</div>
        <div className="text-lg text-muted-foreground">{formattedDate}</div>
      </div>
    </div>
  );
}
