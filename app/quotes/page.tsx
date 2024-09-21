import AnonQuotesPage from '@/components/quotes/anon/page';
import UserQuotesPage from '@/components/quotes/user/page';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quotes',
  description: 'Browse and search for quotes',
};

export default async function QuotesPage() {
  const { isAuthenticated: getIsAuthenticated } = getKindeServerSession();
  const isAuthenticated = await getIsAuthenticated();

  return isAuthenticated ? <UserQuotesPage /> : <AnonQuotesPage />;
}
