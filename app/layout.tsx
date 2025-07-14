import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GeistMono } from 'geist/font/mono';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import Navbar from '@/components/navbar';
import Providers from '@/components/providers';
import TopBarSkeleton from '@/components/skeletons/top-bar';
import TopBarAuthWrapper from '@/components/top-bar-auth-wrapper';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mesbah Matrix',
  description: 'Manage and take control of your life',
};

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png" />
        <link rel="manifest" href="favicon/site.webmanifest" />
        <link rel="mask-icon" href="favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#2d89ef" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="favicon/favicon.ico" sizes="48x48" />
        <link rel="icon" href="favicon/favicon.svg" sizes="any" type="image/svg+xml" />
      </head>
      <body className={`${GeistMono.className} overflow-hidden antialiased`}>
        <Providers>
          <main className="flex">
            <Navbar />
            <div className="container flex h-dvh max-h-dvh min-h-dvh flex-col gap-2 overflow-hidden p-2">
              <Suspense fallback={<TopBarSkeleton />}>
                <TopBarAuthWrapper />
              </Suspense>
              {children}
            </div>
          </main>
          <Toaster />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
