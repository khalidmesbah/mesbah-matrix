'use client';

import Link from 'next/link';
import { AmiriFont } from '@/lib/fonts/fonts';
import useAzkarStore from '@/stores/azkar';

export const dynamic = 'force-static';

export default function AzkarPage() {
  const { categories } = useAzkarStore((state) => state);
  return (
    <div className="grid-cols-fit grid gap-2" dir="rtl">
      {Object.keys(categories).map((id, i) => {
        return (
          <Link
            className="bg-card hover:bg-primary/50 flex flex-col items-center justify-center gap-2 rounded-md border p-2 text-center transition-colors"
            href={`/azkar/${id}`}
            key={i}
          >
            <p dir="rtl" lang="ar" className={`${AmiriFont.className} pt-2 text-xl/[2.5rem]`}>
              {categories[id].ar}
            </p>
            <p dir="ltr">{categories[id].en}</p>
          </Link>
        );
      })}
    </div>
  );
}
