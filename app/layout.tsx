import Navbar from '@/components/navbar';
import Providers from '@/components/providers';
import TopBarSkeleton from '@/components/skeletons/top-bar';
import TopBarAuthWrapper from '@/components/top-bar-auth-wrapper';
import { Toaster } from '@/components/ui/sonner';
import { GeistMono } from 'geist/font/mono';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mesbah Matrix',
  description: 'Live better',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistMono.className}>
        <Providers>
          <main className="flex">
            <Navbar />
            <div className="container flex h-dvh max-h-dvh flex-col gap-2 overflow-auto p-2">
              <Suspense fallback={<TopBarSkeleton />}>
                <TopBarAuthWrapper />
              </Suspense>
              {children}
            </div>
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
