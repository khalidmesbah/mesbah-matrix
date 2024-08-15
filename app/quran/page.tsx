import AnonQuranPage from '@/components/quran/anon/page';
import UserQuranPage from '@/components/quran/user/page';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export default async function QuranPage() {
  const { isAuthenticated: getIsAuthenticated } = getKindeServerSession();
  const isAuthenticated = await getIsAuthenticated();

  return isAuthenticated ? <UserQuranPage /> : <AnonQuranPage />;
}
