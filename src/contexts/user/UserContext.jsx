/**
 * USER CONTEXT  —  src/contexts/user/UserContext.jsx
 * ====================================================
 * Provides: { data: User|null, status, error, refresh }
 *
 * Depends on AuthContext: loads user when isAuthenticated, clears when logged out.
 * Must be rendered BELOW <AuthProvider> in RouterProviders.
 *
 * AbortController cancels in-flight requests on unmount or auth change.
 */
import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useAuth } from "@/contexts/auth/useAuth";
import { fetchUser } from "./userApi";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading"); // 'loading' | 'ready' | 'error'
  const [error, setError] = useState(null);

  const abortRef = useRef(null);

  const load = useCallback(() => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setStatus("loading");
    setError(null);

    fetchUser(controller.signal)
      .then((user) => {
        setData(user);
        setStatus("ready");
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        console.error("[user] fetch error:", err);
        setError(err.message ?? "Unknown error");
        setStatus("error");
      });
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      load();
    } else {
      // Logged out — clear user data immediately
      abortRef.current?.abort();
      setData(null);
      setStatus("ready");
      setError(null);
    }

    return () => abortRef.current?.abort();
  }, [isAuthenticated, load]);

  const value = useMemo(
    () => ({ data, status, error, refresh: load }),
    [data, status, error, load]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
