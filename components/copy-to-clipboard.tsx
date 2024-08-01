'use client';

import { Button } from '@/components/ui/button';
import { SizeType, VariantType } from '@/types';
import { Clipboard, ClipboardCheck } from 'lucide-react';
import { useState } from 'react';

export default function CopyToClipboard({
  className,
  variant,
  size,
  text,
}: {
  className?: string;
  variant?: VariantType;
  size?: SizeType;
  text: string;
}) {
  const [copied, setCopiedState] = useState(false);

  return (
    <Button
      variant={variant || 'ghost'}
      size={size || 'icon'}
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
