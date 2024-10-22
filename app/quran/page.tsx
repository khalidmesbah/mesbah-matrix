import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import type { Metadata } from 'next';
import AnonQuranPage from './_components/anon/page';
import UserQuranPage from './_components/user/page';

export const metadata: Metadata = {
  title: 'Quran',
  description: 'Read and explore the Holy Quran with ease.',
};

export default async function QuranPage() {
  const { isAuthenticated: getIsAuthenticated } = getKindeServerSession();
  const isAuthenticated = await getIsAuthenticated();

  return isAuthenticated ? <UserQuranPage /> : <AnonQuranPage />;
}
