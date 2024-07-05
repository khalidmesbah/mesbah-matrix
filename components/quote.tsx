import { Card } from "@/components/ui/card";
import { QuoteType } from "@/types";
import { Star } from "lucide-react";
import { Button } from "./ui/button";

export default function Quote({
  quote,
  isFavourite,
}: {
  quote: QuoteType;
  isFavourite: boolean;
}) {
  return (
    <Card className="p-6 bg-card text-card-foreground rounded-lg shadow-md">
      <blockquote className="text-xl font-medium">
        &quot;{quote.content}&quot;
      </blockquote>
      <div className="flex items-center gap-1 justify-between mt-4">
        <cite className="text-muted-foreground text-sm font-medium">
          - {quote.author}
        </cite>
        <Button variant={"ghost"}>
          <Star className={`${isFavourite && "fill-foreground"}`} />
        </Button>
      </div>
    </Card>
  );
}
