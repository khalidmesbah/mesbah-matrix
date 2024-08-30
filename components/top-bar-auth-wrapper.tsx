import TopBar from '@/components/top-bar';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export default async function TopBarAuthWrapper() {
  const { isAuthenticated: getIsAuthenticated } = getKindeServerSession();
  const isAuthenticated = await getIsAuthenticated();

  return isAuthenticated ? null : <TopBar />;
}
