import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import { GeistMono } from "geist/font/mono";
import Providers from "@/components/providers";
import TopBarAlert from "@/components/top-bar";

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
          {/*<TopBarAlert />*/}
          <main className="flex gap-1">
            <Navbar />
            <div className="container max-h-screen overflow-auto p-1">
              {children}
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
