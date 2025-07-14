'use client';

import { LoginLink } from '@kinde-oss/kinde-auth-nextjs';
import { CircleAlertIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useTopBarStore from '@/stores/top-bar';

export default function TopBar() {
  const { isClosed, setIsClosed } = useTopBarStore((state) => state);

  if (isClosed) return null;

  return (
    <div className="flex items-center justify-between gap-2 rounded-md border p-2">
      <div className="flex items-center gap-2">
        <CircleAlertIcon className="h-5 min-h-5 w-5 min-w-5" />
        <p className="text-sm md:text-lg">
          You are not authenticated. Please <LoginLink className="underline">Sign In</LoginLink> to
          save your data.
        </p>
      </div>
      <Button
        variant="ghost"
        className="size-5 min-h-5 min-w-5"
        size="icon"
        onClick={() => setIsClosed(true)}
      >
        <XIcon className="h-5 w-5" />
        <span className="sr-only">Dismiss</span>
      </Button>
    </div>
  );
}
