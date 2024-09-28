'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCalendarMutate } from '@/lib/hooks/use-calendar';
import { YouTubeEmbed } from '@next/third-parties/google';
import { Calendar, CheckCircle, Loader2, Save, Settings, Youtube } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';

const urlSchema = z
  .string()
  .url()
  .refine((url) => url.startsWith('https://calendar.google.com/calendar/embed?src='), {
    message: 'URL must starts with https://calendar.google.com/calendar/embed?src=',
  });

export default function Tutorial() {
  const [publicUrl, setPublicUrl] = useState('');
  const [validationError, setValidationError] = useState('');
  const { mutate: setSrc, isPending } = useCalendarMutate();

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
    <Card className="mx-auto max-w-3xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Getting the Public URL for Your Google Calendar
        </CardTitle>
        <CardDescription>
          Follow these steps to obtain the public URL for your Google Calendar
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Step 1: Open Google Calendar on Your Computer
          </h3>
          <p className="text-muted-foreground">
            You can only get the public URL from a computer, not the Google Calendar mobile app.
          </p>
          <Button variant="outline" asChild>
            <a
              href="https://calendar.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              Open Google Calendar
            </a>
          </Button>
        </div>

        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Step 2: Access Calendar Settings
          </h3>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            <li>
              Click the <Settings className="inline h-4 w-4" /> Settings icon in the top right
            </li>
            <li>Select "Settings" from the dropdown menu</li>
            <li>On the left sidebar, click the name of the calendar you want to share</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Step 3: Locate the Public URL
          </h3>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            <li>Scroll down to the "Integrate calendar" section</li>
            <li>Find the "Public URL to this calendar" field</li>
            <li>Copy the URL provided in this field</li>
          </ul>
        </div>

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
              className="flex-grow"
              type="url"
            />
            <Button
              disabled={isPending}
              onClick={handleSaveUrl}
              variant="outline"
              className="self-start"
            >
              {isPending ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              <span>Save URL</span>
            </Button>
          </div>
          {validationError && <p className="text-sm text-red-500">{validationError}</p>}
          <p className="text-sm text-muted-foreground">
            Use this URL to access this calendar from a web browser.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <Youtube className="h-5 w-5 text-red-500" />
            Video Tutorial
          </h3>
          <div className="aspect-video">
            <YouTubeEmbed videoid="fqPXx03Rl2Y" height={400} params="controls=0" />
          </div>
          <p className="text-sm text-muted-foreground">
            This video tutorial provides a visual guide to help you through the process of obtaining
            and using your Google Calendar's public URL.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
