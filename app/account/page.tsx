"use client";

import { Button } from "@/components/ui/button";
import { signOutWithGoogle } from "@/lib/firebase/auth";
import { removeSession } from "@/lib/server-actions/auth-actions";
import useAuthStore from "@/lib/stores/auth-store";

// why runs two times (check that with console.log(user))
export default function AccountPage() {
  const user = useAuthStore((state) => state.user);

  const handleSignOut = async () => {
    await signOutWithGoogle();
    await removeSession();
  };

  if (!user)
    return (
      <>
        <h1>No user</h1>
      </>
    );
  const { email, displayName } = user;

  return (
    <div>
      <h1>Account</h1>
      <h2>Name</h2>
      <p>{displayName}</p>
      <h2>Email</h2>
      <p>{email}</p>
      <Button onClick={handleSignOut}>Sign out</Button>
    </div>
  );
}
