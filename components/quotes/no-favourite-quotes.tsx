import { StarHalf } from "lucide-react";

export default function NoFavouriteQuotes() {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-card text-card-foreground rounded-lg shadow-md">
      <StarHalf className="w-12 h-12 text-primary" />
      <h3 className="text-xl font-semibold mt-4">No Favourite Quotes Found</h3>
      <p className="text-muted-foreground text-sm mt-2">
        You haven&apos;t added any quotes to your favourites yet.
      </p>
    </div>
  );
}
