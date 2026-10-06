/**
 * useAuth  —  src/contexts/auth/useAuth.js
 * ==========================================
 * Convenience hook that reads from AuthContext.
 * Throws a clear error if used outside <AuthProvider>.
 */
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === null) {
    throw new Error(
      "useAuth() must be used inside <AuthProvider>. " +
      "Make sure AuthProvider is rendered inside <BrowserRouter> via RouterProviders."
    );
  }
  return ctx;
}
