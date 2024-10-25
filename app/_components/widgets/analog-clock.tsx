'use client';

import { useEffect, useState } from 'react';

const AnalogClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const secondRotation = (time.getSeconds() * 360) / 60;
  const minuteRotation = (time.getMinutes() * 360) / 60 + (time.getSeconds() * 6) / 60;
  const hourRotation = (time.getHours() * 360) / 12 + (time.getMinutes() * 30) / 60;

  return (
    <div className="min-h-30 min-w-30 size-full rounded-full p-2">
      <svg viewBox="0 0 200 200" className="h-full w-full drop-shadow-xl">
        {/* Outer ring */}
        <circle cx="100" cy="100" r="98" className="fill-background stroke-primary stroke-2" />

        {/* Inner circle */}
        <circle cx="100" cy="100" r="90" className="fill-card stroke-primary stroke-1 opacity-50" />

        {/* Hour markers */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = 100 + 70 * Math.sin(angle);
          const y1 = 100 - 70 * Math.cos(angle);
          const x2 = 100 + 80 * Math.sin(angle);
          const y2 = 100 - 80 * Math.cos(angle);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              className="stroke-primary"
              strokeWidth={i % 3 === 0 ? '3' : '1'}
              strokeLinecap="round"
            />
          );
        })}

        {/* Minute markers */}
        {[...Array(60)].map((_, i) => {
          if (i % 5 === 0) return null;
          const angle = (i * 6 * Math.PI) / 180;
          const x1 = 100 + 75 * Math.sin(angle);
          const y1 = 100 - 75 * Math.cos(angle);
          const x2 = 100 + 78 * Math.sin(angle);
          const y2 = 100 - 78 * Math.cos(angle);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              className="stroke-primary opacity-30"
              strokeWidth="1"
              strokeLinecap="round"
            />
          );
        })}

        {/* Hour numbers */}
        {[...Array(12)].map((_, i) => {
          const angle = ((i * 30 - 90) * Math.PI) / 180;
          const x = 100 + 58 * Math.cos(angle);
          const y = 100 + 58 * Math.sin(angle);
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-foreground text-xs font-medium"
              style={{ fontSize: '0.8rem' }}
            >
              {i === 0 ? '12' : i}
            </text>
          );
        })}

        {/* Hour hand */}
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="60"
          className="stroke-foreground"
          strokeWidth="3"
          strokeLinecap="round"
          transform={`rotate(${hourRotation}, 100, 100)`}
        />

        {/* Minute hand */}
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="50"
          className="stroke-foreground"
          strokeWidth="2"
          strokeLinecap="round"
          transform={`rotate(${minuteRotation}, 100, 100)`}
        />

        {/* Second hand */}
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="40"
          className="stroke-primary"
          strokeWidth="1"
          transform={`rotate(${secondRotation}, 100, 100)`}
        />

        {/* Center elements */}
        <circle cx="100" cy="100" r="4" className="fill-primary" />
        <circle cx="100" cy="100" r="2" className="fill-foreground" />
      </svg>
    </div>
  );
};

export default AnalogClock;
