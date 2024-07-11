import { TriangleAlertIcon } from "lucide-react";

export function NoQuoteOfTheDay() {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-card text-card-foreground rounded-lg shadow-md">
      <TriangleAlertIcon className="w-12 h-12 text-primary" />
      <h3 className="text-xl font-semibold mt-4">No Quote of the Day</h3>
      <p className="text-muted-foreground text-sm mt-2">
        There is no quote available for today. Please check back later.
      </p>
    </div>
  );
}
