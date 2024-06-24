import { type User } from "firebase/auth";
import { create } from "zustand";


// Zustand implementation
type AuthStore = {
  user: User | null;
  setUser: (newUser: User | null) => void;
};

const useAuthStore = create<AuthStore>(
  (set): AuthStore => ({
    user: null,
    setUser: (newUser) =>
      set((state) => ({
        ...state,
        user: newUser
      })),
  })
);

export default useAuthStore;
