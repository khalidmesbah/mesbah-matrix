'use client';

import useAzkarStore from '@/lib/stores/azkar-store';
import Link from 'next/link';

export default function AzkarPage() {
  const { categories } = useAzkarStore((state) => state);
  return (
    <div className="grid grid-cols-fit gap-2" dir="rtl">
      {Object.keys(categories).map((id, i) => {
        return (
          <Link
            className="flex gap-2 flex-col p-2 bg-card border transition-colors hover:bg-primary/50 items-center justify-center text-center rounded-md"
            href={`/azkar/${id}`}
            key={i}
          >
            <p>{categories[id].ar}</p>
            <p dir="ltr">{categories[id].en}</p>
          </Link>
        );
      })}
    </div>
  );
}
