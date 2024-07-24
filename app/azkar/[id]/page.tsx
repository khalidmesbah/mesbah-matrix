'use client';

import Zekr from '@/components/azkar/zekr';
import useMySound from '@/lib/hooks/use-my-sound';
import useAzkarStore from '@/lib/stores/azkar-store';
import { startFireworks } from '@/lib/utils';
import { CategoriesType, ZekrType } from '@/types';

export default function CategoryPage({ params: { id } }: { params: { id: string } }) {
  const { azkar, categories, wasCompleted, setWasCompleted } = useAzkarStore((state) => state);
  const isComplete = azkar[id].every((z) => z.count === z.maximumCount);
  const [play] = useMySound('/sounds/winfantasia-6912.mp3');

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
