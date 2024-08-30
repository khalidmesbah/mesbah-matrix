'use client';

import { AmiriFont } from '@/lib/fonts/fonts';
import useAzkarStore from '@/stores/azkar';
import Link from 'next/link';

export default function AzkarPage() {
  const { categories } = useAzkarStore((state) => state);
  return (
    <div className="grid grid-cols-fit gap-2" dir="rtl">
      {Object.keys(categories).map((id, i) => {
        return (
          <Link
            className="flex flex-col items-center justify-center gap-2 rounded-md border bg-card p-2 text-center transition-colors hover:bg-primary/50"
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
