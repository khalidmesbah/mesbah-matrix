import FavouriteButton from '@/components/quotes/anon/favourite-button';
import { Card } from '@/components/ui/card';
import { QuoteT } from '@/lib/types/quote';

export default function Quote({ quote }: { quote: QuoteT }) {
  return (
    <Card className="rounded-md p-2 shadow-md">
      <blockquote className="text-xl font-medium">&quot;{quote.content}&quot;</blockquote>
      <div className="mt-4 flex items-center justify-between gap-2">
        <cite className="text-sm font-medium text-muted-foreground">- {quote.author}</cite>
        <FavouriteButton quote={quote} />
      </div>
    </Card>
  );
}
