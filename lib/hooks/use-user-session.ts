import { useEffect, useState } from "react";
import { onAuthStateChanged } from "@/lib/firebase/auth";
import useAuthStore from "../stores/auth-store";

export function useUserSession(InitSession: string | null) {
  const [userUid, setUserUid] = useState<string | null>(InitSession);
  const setUser = useAuthStore((state) => state.setUser);

  // Listen for changes to the user session
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (authUser) => {
      setUser(authUser);
      if (authUser) {
        setUserUid(authUser.uid);
      } else {
        setUserUid(null);
      }
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return userUid;
}
