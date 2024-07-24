'use client';

import CopyToClipboard from '@/components/copy-to-clipboard';
import ShareButton from '@/components/share-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import useMySound from '@/lib/hooks/use-my-sound';
import useAzkarStore from '@/lib/stores/azkar-store';
import { ZekrType } from '@/types';
import { Check, RotateCcw } from 'lucide-react';

// FIX: share button
// TODO: add description button
//  => if there's none say "no description yet"

export default function Zekr({ zekr }: { zekr: ZekrType }) {
  const { categories, finishZekr, increaseCount, resetCount } = useAzkarStore((state) => state);
  const [play] = useMySound('/sounds/transition-chord-.wav', { volume: 0.5 });

  return (
    <Card
      className={`p-2 space-y-2 ${zekr.count === zekr.maximumCount && 'opacity-50'}`}
      id={zekr.Id.toString()}
    >
      <CardContent>
        <p dir="rtl" className={`${zekr.count === zekr.maximumCount && 'line-through'} flex-1`}>
          {zekr.zekr}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-center gap-2 !p-1 bg-border rounded">
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
