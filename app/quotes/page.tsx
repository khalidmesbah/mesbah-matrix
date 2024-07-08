import AnonQuotesPage from "@/components/anon/quotes-page";
import UserQuotesPage from "@/components/user/quotes-page";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function QuotesPage() {
  const { isAuthenticated: getIsAuthenticated } = getKindeServerSession();
  const isAuthenticated = await getIsAuthenticated();

  return isAuthenticated ? <UserQuotesPage /> : <AnonQuotesPage />;
}
