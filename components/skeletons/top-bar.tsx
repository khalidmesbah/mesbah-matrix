import { Skeleton } from "@/components/ui/skeleton";

export default function TopBarSkeleton() {
  return (
    <div className="p-2 flex items-center justify-between border rounded-md gap-2">
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-5 min-h-5 min-w-5" />
        <Skeleton>
          <p className="text-sm md:text-lg text-transparent select-none">
            You are not authenticated. Please sign in to save your data.
          </p>
        </Skeleton>
      </div>
      <Skeleton className="min-w-5 min-h-5 size-5" />
    </div>
  );
}
