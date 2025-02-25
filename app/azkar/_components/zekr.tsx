'use client';

import CopyToClipboard from '@/components/copy-to-clipboard';
import Icon from '@/components/icon';
import ShareButton from '@/components/share-button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import useMySound from '@/hooks/use-my-sound';
import { AmiriFont } from '@/lib/fonts/fonts';
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
      className={`p-2 ${zekr.count === zekr.maximumCount && 'opacity-50'} relative`}
      id={zekr.Id.toString()}
    >
      <CardContent className="p-0 pb-4">
        <p
          dir="rtl"
          lang="ar"
          className={`${zekr.count === zekr.maximumCount ? 'line-through' : ''} ${AmiriFont.className} flex-1 pt-2 pb-4 text-xl/[2.5rem]`}
        >
          {zekr.zekr}
        </p>
      </CardContent>
      <CardFooter className="bg-border absolute right-4 -bottom-5 left-4 flex items-center justify-center gap-2 rounded-md p-1!">
        <ShareButton
          description="Share this Zekr"
          variant="ghost"
          url={`${process.env.NEXT_PUBLIC_MESBAH_MATRIX_URL}/azkar/${zekr.categoryId}/#${zekr.Id}`}
          title={`${categories[zekr.categoryId]}: ${zekr.zekr}`}
        />
        <CopyToClipboard text={zekr.zekr} description="Copy Zekr" />
        <Icon
          description="Increase count"
          icon={
            <span>
              {zekr.count}/{zekr.maximumCount}
            </span>
          }
          variant={'ghost'}
          size={'icon'}
          onClick={() => {
            if (zekr.count + 1 === zekr.maximumCount) {
              play();
            }
            increaseCount(zekr);
          }}
          className="flex-1"
        />
        <Icon
          description="Reset count"
          icon={<RotateCcw />}
          variant="ghost"
          size="icon"
          onClick={() => resetCount(zekr)}
        />
        <Icon
          description="Finish Zekr"
          icon={<Check />}
          variant="ghost"
          size="icon"
          onClick={() => {
            if (zekr.count !== zekr.maximumCount) {
              play();
            }
            finishZekr(zekr);
          }}
        />
      </CardFooter>
    </Card>
  );
}
