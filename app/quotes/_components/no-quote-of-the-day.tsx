import { TriangleAlertIcon } from 'lucide-react';

export function NoQuoteOfTheDay() {
  return (
    <div className='bg-card text-card-foreground flex flex-col items-center justify-center rounded-lg p-6 shadow-md'>
      <TriangleAlertIcon className='text-primary h-12 w-12' />
      <h3 className='mt-4 text-xl font-semibold'>No Quote of the Day</h3>
      <p className='text-muted-foreground mt-2 text-sm'>
        There is no quote available for today. Please check back later.
      </p>
    </div>
  );
}
