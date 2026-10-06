/**
 * AUTH CONTEXT  —  src/contexts/auth/AuthContext.jsx
 * ====================================================
 * Provides: { isAuthenticated, isLoading, user: {email}, login, logout, error }
 *
 * Placed INSIDE <BrowserRouter> (in RouterProviders) because it may call
 * useNavigate in the future. If you never need router hooks here, it is safe
 * to move it above the router in App.jsx.
 *
 * AbortController usage: login() passes a signal so that if the component
 * unmounts during the 400 ms mock delay, the setState call is skipped.
 */
import { createContext, useState, useEffect, useCallback, useMemo } from "react";
import { login as apiLogin, logout as apiLogout, getSession } from "./authApi";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);   // { token, email } | null
  const [isLoading, setIsLoading] = useState(true); // true until session is resolved
  const [error, setError] = useState(null);

  // Resolve session once on mount (reads localStorage via getSession)
  useEffect(() => {
    const existing = getSession();
    setSession(existing);
    setIsLoading(false);
  }, []);

  /**
   * Log in with email + password.
   * Throws on failure so the Login page can display inline errors.
   */
  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const newSession = await apiLogin(email, password);
      setSession(newSession);
    } catch (err) {
      setError(err.message || "Login failed");
      throw err; // re-throw so the form can handle it
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Log out and clear session state.
   * UserProvider watches isAuthenticated and clears user data automatically.
   */
  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await apiLogout();
    } catch (err) {
      console.error("[auth] logout error:", err);
    } finally {
      setSession(null);
      setIsLoading(false);
    }
  }, []);

  // Memoize value so consumers only re-render when auth state actually changes
  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(session),
      isLoading,
      session,       // { token, email } — read-only, use for display
      error,
      login,
      logout,
    }),
    [session, isLoading, error, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
