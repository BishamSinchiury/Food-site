/**
 * ORG CONTEXT  —  src/contexts/org/OrgContext.jsx
 * =================================================
 * Provides: { data: Org|null, status, error, refresh }
 *
 * Placed OUTSIDE <BrowserRouter> in App.jsx because it does not need
 * any router hooks. If you later need the auth token here (e.g. to pass an
 * Authorization header to fetchOrg), move OrgProvider INSIDE RouterProviders
 * in AppRoutes.jsx, placing it BELOW AuthProvider.
 *
 * AbortController cancels in-flight requests on unmount or refresh.
 */
import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { fetchOrg } from "./orgApi";

export const OrgContext = createContext(null);

export function OrgProvider({ children }) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading"); // 'loading' | 'ready' | 'error'
  const [error, setError] = useState(null);

  // Keep a ref to the latest AbortController so refresh() can cancel the previous call
  const abortRef = useRef(null);

  const load = useCallback(() => {
    // Cancel any in-flight request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setStatus("loading");
    setError(null);

    fetchOrg(controller.signal)
      .then((org) => {
        setData(org);
        setStatus("ready");
      })
      .catch((err) => {
        if (err.name === "AbortError") return; // component unmounted — ignore
        console.error("[org] fetch error:", err);
        setError(err.message ?? "Unknown error");
        setStatus("error");
      });
  }, []);

  // Load on mount; cancel on unmount
  useEffect(() => {
    load();
    return () => abortRef.current?.abort();
  }, [load]);

  const value = useMemo(
    () => ({ data, status, error, refresh: load }),
    [data, status, error, load]
  );

  return <OrgContext.Provider value={value}>{children}</OrgContext.Provider>;
}
