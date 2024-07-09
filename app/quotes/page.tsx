import AnonQuotesPage from "@/components/anon/quotes-page";
import UserQuotesPage from "@/components/user/quotes-page";
import { wait } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function QuotesPage() {
  await wait(2000);
  const { isAuthenticated: getIsAuthenticated } = getKindeServerSession();
  const isAuthenticated = await getIsAuthenticated();

  return isAuthenticated ? <UserQuotesPage /> : <AnonQuotesPage />;
}
