import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export default async function AccountPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return <h1>No user</h1>;

  return (
    <div>
      <h1>{user.id}</h1>
      <h2>Name</h2>
      <p>{user.given_name}</p>
      <h2>Email</h2>
      <p>{user.email}</p>
      <LogoutLink postLogoutRedirectURL="/focus">Log out</LogoutLink>
    </div>
  );
}
