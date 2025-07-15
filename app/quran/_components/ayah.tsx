'use client';

import CopyToClipboard from '@/components/copy-to-clipboard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AmiriFont, AmiriQuranFont } from '@/lib/fonts/fonts';
import type { AyahT } from '@/lib/types/quran';
import { cn } from '@/lib/utils';

type AyahProps = {
  ayah: AyahT;
  font: string;
};

export default function Ayah({ ayah, font }: AyahProps) {
  return (
    <ScrollArea className='max-h-52 w-full rounded-md border'>
      <div className='group'>
        <p
          className={cn(
            `bg-card rounded-md px-2 text-center text-2xl/[3rem] ${font === '__className_af25f8' ? AmiriQuranFont.className : AmiriFont.className}`,
            {
              'pt-6 pb-4': font === '__className_a12e74',
              'pt-4 pb-6': font === '__className_af25f8',
            },
          )}
          dir='rtl'
          lang='ar'
        >
          {ayah.text}
        </p>
        <CopyToClipboard
          text={ayah.text}
          className='absolute bottom-1 left-1 h-7 w-6 p-0 opacity-0 transition-opacity group-hover:opacity-100'
          variant='outline'
          size='sm'
        />
      </div>
    </ScrollArea>
  );
}
