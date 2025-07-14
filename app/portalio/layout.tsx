import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portalio',
  description: 'Your personal gateway to a customized internet',
};

export default async function WorkSpacesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
