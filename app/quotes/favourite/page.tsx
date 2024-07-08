import AnonFavouriteQuotesPage from "@/components/anon/favourite-quotes-page";
import UserFavouriteQuotesPage from "@/components/user/favourite-quotes-page";
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
