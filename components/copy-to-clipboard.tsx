'use client';

import { Clipboard, ClipboardCheck } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { SizeT, VariantT } from '@/lib/types/globals';

export default function CopyToClipboard({
  className,
  variant,
  size,
  text,
  description,
}: {
  className?: string;
  variant?: VariantT;
  size?: SizeT;
  text: string;
  description?: string;
}) {
  const [copied, setCopiedState] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
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
        </TooltipTrigger>
        <TooltipContent>{description}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
