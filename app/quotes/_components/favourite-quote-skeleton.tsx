import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from 'lucide-react';

export default function FavouriteQuoteSkeleton() {
  return (
    <section className="flex select-none flex-col items-center gap-4 text-center text-transparent">
      <Badge>Quote of the Day</Badge>

      <Skeleton className="max-w-3xl break-words text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl">
        &quot;Things are as they are. Looking out into it the universe at night, we make no
        comparisons between right and wrong stars, nor between well and badly arranged
        constellations.&quot;
      </Skeleton>

      <div className="flex items-center justify-between gap-2">
        <Skeleton className="text-sm font-medium">- Alan Watts</Skeleton>
        <Skeleton className="size-10" />
      </div>
    </section>
  );
}
