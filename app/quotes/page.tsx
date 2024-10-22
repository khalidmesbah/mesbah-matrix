import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import type { Metadata } from 'next';
import AnonQuotesPage from './_components/anon/page';
import UserQuotesPage from './_components/user/page';

export const metadata: Metadata = {
  title: 'Quotes',
  description: 'Browse and search for quotes',
};

export default async function QuotesPage() {
  const { isAuthenticated: getIsAuthenticated } = getKindeServerSession();
  const isAuthenticated = await getIsAuthenticated();

  return isAuthenticated ? <UserQuotesPage /> : <AnonQuotesPage />;
}
