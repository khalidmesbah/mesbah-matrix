import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import { GeistMono } from "geist/font/mono";
import Providers from "@/components/providers";
import { Suspense } from "react";
import TopBarAuthWrapper from "@/components/top-bar-auth-wrapper";
import TopBarSkeleton from "@/components/skeletons/top-bar";

export const metadata: Metadata = {
  title: "Mesbah Matrix",
  description: "Live better",
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
            <div className="container max-h-dvh h-dvh overflow-auto p-2 flex flex-col gap-2">
              <Suspense fallback={<TopBarSkeleton />}>
                <TopBarAuthWrapper />
              </Suspense>
              {children}
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
