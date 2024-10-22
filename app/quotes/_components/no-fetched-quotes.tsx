import { TriangleAlertIcon } from 'lucide-react';

export default function NoFetchedQuotes() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-card p-6 text-card-foreground shadow-md">
      <TriangleAlertIcon className="h-12 w-12 text-primary" />
      <h3 className="mt-4 text-xl font-semibold">Failed to Get Quotes</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        There was an error getting the quotes. Please try again later.
      </p>
    </div>
  );
}
