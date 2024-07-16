'use client';

import Zekr from '@/components/azkar/zekr';
import useAzkarStore from '@/lib/stores/azkar-store';
import { CategoriesType, ZekrType } from '@/types';
import confetti from 'canvas-confetti';
import useSound from 'use-sound';

export default function CategoryPage({ params: { id } }: { params: { id: string } }) {
  const { azkar, categories, wasCompleted, setWasCompleted } = useAzkarStore((state) => state);
  const isComplete = azkar[id].every((z) => z.count === z.maximumCount);
  const [play] = useSound('/sounds/winfantasia-6912.mp3');
  const startFireworks = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  if (!wasCompleted[+id] && isComplete) {
    setWasCompleted(+id, true);
    play();
    startFireworks();
  }
  if (wasCompleted[+id] && !isComplete) {
    setWasCompleted(+id, false);
  }

  return (
    <div>
      <h2 className="mb-2 flex flex-col items-center justify-between gap-2 rounded-md bg-secondary p-2 xs:flex-row">
        <p>{categories[id].en}</p>
        <p dir="rtl">{(categories as CategoriesType)[id].ar}</p>
      </h2>
      <div className="flex flex-col gap-2 items-stretch max-w-[500px] mx-auto">
        {azkar[id].map((zekr: ZekrType, i) => {
          return <Zekr zekr={zekr} key={i} />;
        })}
      </div>
    </div>
  );
}
