import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Azkar',
  description: 'A collection of Islamic azkar (remembrances) and supplications.',
};

export default async function AzkarLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
