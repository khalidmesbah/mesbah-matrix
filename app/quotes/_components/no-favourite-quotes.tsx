import { StarHalf } from 'lucide-react';

export default function NoFavouriteQuotes() {
  return (
    <div className='bg-card text-card-foreground flex flex-col items-center justify-center rounded-lg p-6 shadow-md'>
      <StarHalf className='text-primary h-12 w-12' />
      <h3 className='mt-4 text-xl font-semibold'>No Favourite Quotes Found</h3>
      <p className='text-muted-foreground mt-2 text-sm'>
        You haven&apos;t added any quotes to your favourites yet.
      </p>
    </div>
  );
}
