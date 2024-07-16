'use client';

import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck } from 'lucide-react';
import { useState } from 'react';

export default function CopyToClipboard({ className, text }: { className?: string; text: string }) {
  const [copied, setCopiedState] = useState(false);

  return (
    <Button
      variant={'ghost'}
      size={'icon'}
      className={className}
      onClick={() => {
        if (copied) return;
        navigator.clipboard.writeText(text);

        setCopiedState(true);
        setTimeout(() => {
          setCopiedState(false);
        }, 1000);
      }}
    >
      {copied ? <ClipboardCheck /> : <Clipboard />}
    </Button>
  );
}
