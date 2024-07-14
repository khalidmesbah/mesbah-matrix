import { StarHalf } from 'lucide-react';

export default function NoFavouriteQuotes() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-card p-6 text-card-foreground shadow-md">
      <StarHalf className="h-12 w-12 text-primary" />
      <h3 className="mt-4 text-xl font-semibold">No Favourite Quotes Found</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        You haven&apos;t added any quotes to your favourites yet.
      </p>
    </div>
  );
}
