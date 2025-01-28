'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useCalendarStore from '@/lib/stores/calendar';
import { CheckCircle, Save } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';

const urlSchema = z
  .string()
  .url()
  .refine((url) => url.startsWith('https://calendar.google.com/calendar/embed?src='), {
    message: 'URL must starts with https://calendar.google.com/calendar/embed?src=',
  });

export default function PublicUrlInput() {
  const [publicUrl, setPublicUrl] = useState('');
  const [validationError, setValidationError] = useState('');
  const { setSrc } = useCalendarStore();

  const handleSaveUrl = () => {
    try {
      urlSchema.parse(publicUrl);
      setValidationError('');
      setSrc(publicUrl);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationError(error.errors[0].message);
      }
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-lg font-semibold">
        <CheckCircle className="h-5 w-5 text-green-500" />
        Step 4: Save and Use the Public URL
      </h3>
      <p className="text-muted-foreground">Paste the copied public URL into the field below:</p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          placeholder="Paste your public calendar URL here"
          value={publicUrl}
          onChange={(e) => {
            setPublicUrl(e.target.value);
            setValidationError('');
          }}
          className="grow"
          type="url"
        />
        <Button onClick={handleSaveUrl} variant="outline" className="self-start">
          <Save className="mr-2 h-4 w-4" />
          <span>Save URL</span>
        </Button>
      </div>
      {validationError && <p className="text-sm text-red-500">{validationError}</p>}
      <p className="text-sm text-muted-foreground">
        Use this URL to access this calendar from a web browser.
      </p>
    </div>
  );
}
