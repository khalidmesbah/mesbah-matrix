import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import type { Metadata } from 'next';
import AnonFavouriteQuotesPage from '../_components/anon/favourite-quotes';
import UserFavouriteQuotesPage from '../_components/user/favourite-quotes';

export const metadata: Metadata = {
  title: 'Favourite Quotes',
  description: 'View and manage your favourite quotes.',
};

export default async function FavouriteQuotesPage() {
  const { isAuthenticated: getIsAuthenticated } = getKindeServerSession();
  const isAuthenticated = await getIsAuthenticated();

  return isAuthenticated ? <UserFavouriteQuotesPage /> : <AnonFavouriteQuotesPage />;
}
