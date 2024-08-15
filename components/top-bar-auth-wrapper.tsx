import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
// TODO: use @
import TopBar from './top-bar';

export default async function TopBarAuthWrapper() {
  const { isAuthenticated } = getKindeServerSession();

  return (await isAuthenticated()) ? null : <TopBar />;
}
