import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import AuthenticatedMatrix from "@/components/authenticated-matrix";
import UnAuthenticatedMatrix from "@/components/unauthenticated-matrix";

export default async function Home() {
  const { isAuthenticated: getAuthenticationState } = getKindeServerSession();
  const isAuthenticated = await getAuthenticationState();

  return isAuthenticated ? <AuthenticatedMatrix /> : <UnAuthenticatedMatrix />;
}
