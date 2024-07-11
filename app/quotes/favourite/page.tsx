import AnonFavouriteQuotesPage from "@/components/quotes/anon/favourite-quotes-page";
import UserFavouriteQuotesPage from "@/components/quotes/user/favourite-quotes-page";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function FavouriteQuotesPage() {
  const { isAuthenticated: getIsAuthenticated } = getKindeServerSession();
  const isAuthenticated = await getIsAuthenticated();

  return isAuthenticated ? (
    <UserFavouriteQuotesPage />
  ) : (
    <AnonFavouriteQuotesPage />
  );
}
