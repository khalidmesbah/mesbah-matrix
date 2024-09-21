import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Analytics',
  description: 'Analytics, measuring, improving, and gaining insights.',
};

export default async function AnalyticsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
