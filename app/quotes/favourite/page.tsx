import AnonFavouriteQuotesPage from '@/components/quotes/anon/favourite-quotes';
import UserFavouriteQuotesPage from '@/components/quotes/user/favourite-quotes';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export default async function FavouriteQuotesPage() {
  const { isAuthenticated: getIsAuthenticated } = getKindeServerSession();
  const isAuthenticated = await getIsAuthenticated();

  return isAuthenticated ? <UserFavouriteQuotesPage /> : <AnonFavouriteQuotesPage />;
}
