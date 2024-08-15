'use client';

import CopyToClipboard from '@/components/copy-to-clipboard';
import ShareButton from '@/components/share-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import useMySound from '@/hooks/use-my-sound';
import useAzkarStore from '@/stores/azkar';
import { ZekrT } from '@/types/azkar';
import { Check, RotateCcw } from 'lucide-react';

// FIX: share button
// TODO: add description button
//  => if there's none say "no description yet"

export default function Zekr({ zekr }: { zekr: ZekrT }) {
  const { categories, finishZekr, increaseCount, resetCount } = useAzkarStore((state) => state);
  const [play] = useMySound('/sounds/transition-chord-.wav', { volume: 0.5 });

  return (
    <Card
      className={`space-y-2 p-2 ${zekr.count === zekr.maximumCount && 'opacity-50'}`}
      id={zekr.Id.toString()}
    >
      <CardContent>
        <p
          dir="rtl"
          lang="ar"
          className={`${zekr.count === zekr.maximumCount && 'line-through'} {AmiriFont.className} flex-1`}
        >
          {zekr.zekr}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-center gap-2 rounded bg-border !p-1">
        <ShareButton
          url={`${process.env.NEXT_PUBLIC_MESBAH_MATRIX_URL}/azkar/${zekr.categoryId}/#${zekr.Id}`}
          title={`${categories[zekr.categoryId]}: ${zekr.zekr}`}
        />
        <CopyToClipboard text={zekr.zekr} />
        <Button
          variant={'ghost'}
          size={'icon'}
          onClick={() => {
            if (zekr.count + 1 === zekr.maximumCount) {
              play();
            }
            increaseCount(zekr);
          }}
          className="flex-1"
        >
          {zekr.count}/{zekr.maximumCount}
        </Button>
        <Button variant={'ghost'} size={'icon'} onClick={() => resetCount(zekr)}>
          <RotateCcw />
        </Button>
        <Button
          variant={'ghost'}
          size={'icon'}
          onClick={() => {
            if (zekr.count !== zekr.maximumCount) {
              play();
            }
            finishZekr(zekr);
          }}
        >
          <Check />
        </Button>
      </CardFooter>
    </Card>
  );
}
