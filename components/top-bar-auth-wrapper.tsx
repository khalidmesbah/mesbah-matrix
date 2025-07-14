import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import TopBar from '@/components/top-bar';

export default async function TopBarAuthWrapper() {
  const { isAuthenticated: getIsAuthenticated } = getKindeServerSession();
  const isAuthenticated = await getIsAuthenticated();

  return isAuthenticated ? null : <TopBar />;
}
