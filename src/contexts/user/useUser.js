/**
 * useUser  —  src/contexts/user/useUser.js
 * ==========================================
 * Convenience hook. Throws a clear error if used outside <UserProvider>.
 */
import { useContext } from "react";
import { UserContext } from "./UserContext";

export function useUser() {
  const ctx = useContext(UserContext);
  if (ctx === null) {
    throw new Error(
      "useUser() must be used inside <UserProvider>. " +
      "Make sure UserProvider is rendered inside RouterProviders in AppRoutes.jsx."
    );
  }
  return ctx;
}
