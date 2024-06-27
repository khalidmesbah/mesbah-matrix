import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { SESSION_COOKIE_NAME } from "@/constants"; // added
import { cookies } from "next/headers";
import { GeistMono } from "geist/font/mono";
import Providers from "@/components/providers";

export const metadata: Metadata = {
  title: "Mesbah Matrix",
  description: "Live better",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = cookies().get(SESSION_COOKIE_NAME)?.value || null;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistMono.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <main className="flex min-h-screen gap-2 overflow-hidden">
              <Navbar session={session} />
              <div className="w-full min-h-[inherit] max-h-[100vh] p-1 container overflow-auto">
                {children}
              </div>
            </main>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
