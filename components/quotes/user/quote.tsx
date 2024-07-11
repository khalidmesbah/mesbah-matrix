import { Card } from "@/components/ui/card";
import { QuoteType } from "@/types";
import FavouriteButton from "@/components/quotes/user/favourite-button";

export default function Quote({ quote }: { quote: QuoteType }) {
  return (
    <Card className="p-2 rounded-md shadow-md">
      <blockquote className="text-xl font-medium">
        &quot;{quote.content}&quot;
      </blockquote>
      <div className="flex items-center gap-2 justify-between mt-4">
        <cite className="text-muted-foreground text-sm font-medium">
          - {quote.author}
        </cite>
        <FavouriteButton quote={quote} />
      </div>
    </Card>
  );
}
