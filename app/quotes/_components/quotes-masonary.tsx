'use client';

import { Masonry } from 'react-plock';
import QuoteSkeleton from './quote-skeleton';

export default function QuotesMasonary() {
  return (
    <Masonry
      items={Array.from({ length: 7 }).map((_, i) => i)}
      config={{
        columns: [1, 2, 3],
        gap: [8, 8, 8],
        media: [600, 850, 1024],
      }}
      render={(index) => <QuoteSkeleton key={index} />}
    />
  );
}

export const ContentCardSkeletonList = () => {
  return (
    <div className="w-full columns-1 bg-green-500 md:columns-2 lg:columns-3 2xl:columns-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <QuoteSkeleton key={i} />
      ))}
    </div>
  );
};
