'use client';

import { LoginLink } from '@kinde-oss/kinde-auth-nextjs';
import { CircleAlertIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useTopBarStore from '@/stores/top-bar';

export default function TopBar() {
  const { isClosed, setIsClosed } = useTopBarStore((state) => state);

  if (isClosed) return null;

  return (
    <div className='mx-2 mt-2 flex items-center justify-between gap-2 rounded-md border p-2 bg-background shadow-primary shadow-sm absolute top-2 left-16 right-2 z-999'>
      <div className='flex items-center gap-2'>
        <CircleAlertIcon className='h-5 min-h-5 w-5 min-w-5' />
        <p className='text-sm md:text-lg'>
          You are not authenticated. Please <LoginLink className='underline'>Sign In</LoginLink> to
          save your data.
        </p>
      </div>
      <Button
        variant='ghost'
        className='size-5 min-h-5 min-w-5'
        size='icon'
        onClick={() => setIsClosed(true)}
      >
        <XIcon className='h-5 w-5' />
        <span className='sr-only'>Dismiss</span>
      </Button>
    </div>
  );
}
