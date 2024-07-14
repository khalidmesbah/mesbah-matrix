import { TriangleAlertIcon } from 'lucide-react';

export function NoQuoteOfTheDay() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-card p-6 text-card-foreground shadow-md">
      <TriangleAlertIcon className="h-12 w-12 text-primary" />
      <h3 className="mt-4 text-xl font-semibold">No Quote of the Day</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        There is no quote available for today. Please check back later.
      </p>
    </div>
  );
}
