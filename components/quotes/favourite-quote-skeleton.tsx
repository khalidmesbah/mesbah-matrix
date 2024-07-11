import { Badge } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function FavouriteQuoteSkeleton() {
  return (
    <section className="flex flex-col items-center text-center gap-4 select-none text-transparent">
      <Badge>Quote of the Day</Badge>

      <Skeleton className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold max-w-3xl break-words">
        &quot;Things are as they are. Looking out into it the universe at night,
        we make no comparisons between right and wrong stars, nor between well
        and badly arranged constellations.&quot;
      </Skeleton>

      <div className="flex items-center gap-2 justify-between">
        <Skeleton className="text-sm font-medium">- Alan Watts</Skeleton>
        <Skeleton className="size-10" />
      </div>
    </section>
  );
}
