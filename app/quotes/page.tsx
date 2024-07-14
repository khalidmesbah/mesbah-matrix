import AnonQuotesPage from '@/components/quotes/anon/page';
import UserQuotesPage from '@/components/quotes/user/page';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export default async function QuotesPage() {
  const { isAuthenticated: getIsAuthenticated } = getKindeServerSession();
  const isAuthenticated = await getIsAuthenticated();

  return isAuthenticated ? <UserQuotesPage /> : <AnonQuotesPage />;
}
