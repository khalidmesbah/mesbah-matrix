'use client';

import { Loader2, Save, Trash } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useCalendarMutate } from '@/lib/hooks/use-calendar';

const urlSchema = z
  .string()
  .refine((url) => url.startsWith('https://calendar.google.com/calendar/embed?src='), {
    message: 'URL must starts with https://calendar.google.com/calendar/embed?src=',
  });

export default function ChangeCalendar({ src }: { src: string }) {
  const [publicUrl, setPublicUrl] = useState(src);
  const [validationError, setValidationError] = useState('');
  const { mutate: setSrc, isPending } = useCalendarMutate();
  const [isOpen, setIsOpen] = useState(false);

  const handleSaveUrl = () => {
    try {
      urlSchema.parse(publicUrl);
      setValidationError('');
      if (src === publicUrl) {
        throw new z.ZodError([
          {
            code: 'custom',
            path: ['url'],
            message: 'The new URL is the same as the current one.',
            input: publicUrl,
          },
        ]);
      } else setSrc(publicUrl);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationError(error.issues[0]?.message ?? 'Unknown error');
      }
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant='link' size={'sm'} className='text-foreground absolute -top-[8px] right-0'>
          Change
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Change Calendar</SheetTitle>
          <SheetDescription className='sr-only'>change the calendar</SheetDescription>
        </SheetHeader>
        <div className='space-y-4'>
          <p className='text-muted-foreground'>Paste the copied public URL into the field below:</p>
          <div className='flex flex-col gap-2 sm:flex-row'>
            <Input
              placeholder='Paste your public calendar URL here'
              value={publicUrl}
              onChange={(e) => {
                setPublicUrl(e.target.value);
                setValidationError('');
              }}
              className='grow'
              type='url'
            />
          </div>
          {validationError && <p className='text-sm text-red-500'>{validationError}</p>}
          <p className='text-muted-foreground text-sm'>
            Use this URL to access this calendar from a web browser.
          </p>
        </div>
        <SheetFooter>
          <Button
            disabled={isPending}
            onClick={handleSaveUrl}
            variant='outline'
            className='self-start'
          >
            {isPending ? (
              <Loader2 className='mr-2 size-4 animate-spin' />
            ) : (
              <Save className='mr-2 h-4 w-4' />
            )}
            <span>Save URL</span>
          </Button>
        </SheetFooter>

        <Button
          disabled={isPending}
          onClick={() => {
            setSrc('');
            setValidationError('');
          }}
          variant='destructive'
          className='mt-8 w-full'
        >
          {isPending ? (
            <Loader2 className='mr-2 size-4 animate-spin' />
          ) : (
            <Trash className='mr-2 h-4 w-4' />
          )}
          <span>Delete Calendar</span>
        </Button>
      </SheetContent>
    </Sheet>
  );
}
