import { TriangleAlertIcon } from "lucide-react";

export default function NoFetchedQuotes() {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-card text-card-foreground rounded-lg shadow-md">
      <TriangleAlertIcon className="w-12 h-12 text-primary" />
      <h3 className="text-xl font-semibold mt-4">Failed to Get Quotes</h3>
      <p className="text-muted-foreground text-sm mt-2">
        There was an error getting the quotes. Please try again later.
      </p>
    </div>
  );
}
