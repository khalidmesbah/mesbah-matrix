'use client';

import Zekr from '@/components/azkar/zekr';
import useMySound from '@/hooks/use-my-sound';
import { startFireworks } from '@/lib/utils';
import useAzkarStore from '@/stores/azkar';
import { AzkarCategoriesT, ZekrT } from '@/types/azkar';

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
      <h2 className="mb-2 flex flex-col items-center justify-between gap-2 rounded-md bg-primary p-2 xs:flex-row">
        <p>{categories[id].en}</p>
        <p dir="rtl">{(categories as AzkarCategoriesT)[id].ar}</p>
      </h2>
      <div className="mx-auto flex max-w-[500px] flex-col items-stretch gap-8">
        {azkar[id].map((zekr: ZekrT, i) => {
          return <Zekr zekr={zekr} key={i} />;
        })}
      </div>
    </div>
  );
}
