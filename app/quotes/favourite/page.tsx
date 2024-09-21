import AnonFavouriteQuotesPage from '@/components/quotes/anon/favourite-quotes';
import UserFavouriteQuotesPage from '@/components/quotes/user/favourite-quotes';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Favourite Quotes',
  description: 'View and manage your favourite quotes.',
};

export default async function FavouriteQuotesPage() {
  const { isAuthenticated: getIsAuthenticated } = getKindeServerSession();
  const isAuthenticated = await getIsAuthenticated();

  return isAuthenticated ? <UserFavouriteQuotesPage /> : <AnonFavouriteQuotesPage />;
}
