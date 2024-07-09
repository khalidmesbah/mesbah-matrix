import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "../ui/card";
import { randomString } from "@/lib/utils";

export default function QuoteSkeleton() {
  const quote = randomString(125, 200);
  const author = randomString(7, 15);
  return (
    <Card className="p-2 rounded-md shadow-md select-none">
      <Skeleton className="text-xl font-medium text-transparent break-words">
        &quot;{quote}&quot;
      </Skeleton>
      <div className="flex items-center gap-2 justify-between mt-4">
        <Skeleton className="text-sm font-medium text-transparent">
          - {author}
        </Skeleton>
        <Skeleton className="size-10" />
      </div>
    </Card>
  );
}
