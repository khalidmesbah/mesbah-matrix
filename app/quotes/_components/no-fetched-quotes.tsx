import { TriangleAlertIcon } from 'lucide-react';

export default function NoFetchedQuotes() {
  return (
    <div className='bg-card text-card-foreground flex flex-col items-center justify-center rounded-lg p-6 shadow-md'>
      <TriangleAlertIcon className='text-primary h-12 w-12' />
      <h3 className='mt-4 text-xl font-semibold'>Failed to Get Quotes</h3>
      <p className='text-muted-foreground mt-2 text-sm'>
        There was an error getting the quotes. Please try again later.
      </p>
    </div>
  );
}
