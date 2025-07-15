import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { randomString } from '@/lib/utils';

export default function QuoteSkeleton() {
  const quote = randomString(125, 200);
  const author = randomString(7, 15);
  return (
    <Card className='rounded-md p-2 text-transparent shadow-md select-none'>
      <Skeleton className='text-xl font-medium break-words'>&quot;{quote}&quot;</Skeleton>
      <div className='mt-4 flex items-center justify-between gap-2'>
        <Skeleton className='text-sm font-medium text-transparent'>- {author}</Skeleton>
        <Skeleton className='size-10' />
      </div>
    </Card>
  );
}
