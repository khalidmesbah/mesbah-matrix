'use client';

import CopyToClipboard from '@/components/copy-to-clipboard';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { AmiriFont, AmiriQuranFont } from '@/lib/fonts/fonts';
import { cn } from '@/lib/utils';
import { Settings2 } from 'lucide-react';
import { useState } from 'react';

type FontType = '__className_a12e74' | '__className_af25f8';

export default function Ayah() {
  const [ayahText, setAyahText] = useState('السلام عليكم ورحمة الله وبركاته وت');
  const [font, setFont] = useState<FontType>('__className_af25f8');
  const [open, setOpen] = useState(false);

  const handleFontChange = (value: string) => {
    setFont(value as FontType);
  };

  return (
    <ScrollArea className="max-h-52 w-full rounded-md border">
      <div className="group relative">
        <p
          className={cn(
            `rounded-md bg-card px-2 text-center text-2xl/[3rem] ${font === '__className_af25f8' ? AmiriQuranFont.className : AmiriFont.className}`,
            {
              'pb-4 pt-6': font === '__className_a12e74',
              'pb-6 pt-4': font === '__className_af25f8',
            },
          )}
          dir="rtl"
          lang="ar"
        >
          {ayahText}
        </p>
        <div className="absolute bottom-1 left-1 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <CopyToClipboard text={ayahText} className="h-7 w-6 p-0" variant="outline" size="sm" />
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                <Settings2 className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Edit Text and Font</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="text">Arabic Text</Label>
                  <Textarea
                    id="text"
                    dir="rtl"
                    value={ayahText}
                    onChange={(e) => setAyahText(e.target.value)}
                    className="h-32"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Font Style</Label>
                  <RadioGroup
                    value={font}
                    onValueChange={handleFontChange}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="__className_af25f8" id="quran" />
                      <Label htmlFor="quran" className="font-normal">
                        Amiri Quran
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="__className_a12e74" id="regular" />
                      <Label htmlFor="regular" className="font-normal">
                        Amiri Regular
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </ScrollArea>
  );
}
