import { YouTubeEmbed } from '@next/third-parties/google';
import { Calendar, CheckCircle, Settings, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Tutorial({ children }: { children: React.ReactNode }) {
  return (
    <Card className='mx-auto max-w-3xl'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>
          Getting the Public URL for Your Google Calendar
        </CardTitle>
        <CardDescription>
          Follow these steps to obtain the public URL for your Google Calendar
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='space-y-4'>
          <h3 className='flex items-center gap-2 text-lg font-semibold'>
            <CheckCircle className='h-5 w-5 text-green-500' />
            Step 1: Open Google Calendar on Your Computer
          </h3>
          <p className='text-muted-foreground'>
            You can only get the public URL from a computer, not the Google Calendar mobile app.
          </p>
          <Button variant='outline' asChild>
            <a
              href='https://calendar.google.com/'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2'
            >
              <Calendar className='h-4 w-4' />
              Open Google Calendar
            </a>
          </Button>
        </div>

        <div className='space-y-4'>
          <h3 className='flex items-center gap-2 text-lg font-semibold'>
            <CheckCircle className='h-5 w-5 text-green-500' />
            Step 2: Access Calendar Settings
          </h3>
          <ul className='text-muted-foreground list-inside list-disc space-y-2'>
            <li>
              Click the <Settings className='inline h-4 w-4' /> Settings icon in the top right
            </li>
            <li>Select "Settings" from the dropdown menu</li>
            <li>On the left sidebar, click the name of the calendar you want to share</li>
          </ul>
        </div>

        <div className='space-y-4'>
          <h3 className='flex items-center gap-2 text-lg font-semibold'>
            <CheckCircle className='h-5 w-5 text-green-500' />
            Step 3: Locate the Public URL
          </h3>
          <ul className='text-muted-foreground list-inside list-disc space-y-2'>
            <li>Scroll down to the "Integrate calendar" section</li>
            <li>Find the "Public URL to this calendar" field</li>
            <li>Copy the URL provided in this field</li>
          </ul>
        </div>

        {children}

        <div className='space-y-4'>
          <h3 className='flex items-center gap-2 text-lg font-semibold'>
            <Youtube className='h-5 w-5 text-red-500' />
            Video Tutorial
          </h3>
          <div className='aspect-video'>
            <YouTubeEmbed videoid='fqPXx03Rl2Y' params='controls=0' />
          </div>
          <p className='text-muted-foreground text-sm'>
            This video tutorial provides a visual guide to help you through the process of obtaining
            and using your Google Calendar's public URL.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
