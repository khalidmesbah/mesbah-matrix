import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mesbah Matrix',
  description: 'Live better',
};

export default async function WorkSpacesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
