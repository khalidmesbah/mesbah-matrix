import { Skeleton } from '@/components/ui/skeleton';

export default function TopBarSkeleton() {
  return (
    <div className="flex items-center justify-between gap-2 rounded-md border p-2">
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 min-h-5 w-5 min-w-5" />
        <Skeleton>
          <p className="select-none text-sm text-transparent md:text-lg">
            You are not authenticated. Please sign in to save your data.
          </p>
        </Skeleton>
      </div>
      <Skeleton className="size-5 min-h-5 min-w-5" />
    </div>
  );
}
