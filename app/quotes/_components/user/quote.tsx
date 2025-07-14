import { Card } from '@/components/ui/card';
import type { QuoteT } from '@/lib/types/quote';
import FavouriteButton from './favourite-button';

export default function Quote({ quote }: { quote: QuoteT }) {
  return (
    <Card className="rounded-md p-2 shadow-md">
      <blockquote className="text-xl font-medium">&quot;{quote.content}&quot;</blockquote>
      <div className="mt-4 flex items-center justify-between gap-2">
        <cite className="text-muted-foreground text-sm font-medium">- {quote.author}</cite>
        <FavouriteButton quote={quote} />
      </div>
    </Card>
  );
}
