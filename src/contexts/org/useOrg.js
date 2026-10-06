/**
 * useOrg  —  src/contexts/org/useOrg.js
 * ========================================
 * Convenience hook. Throws a clear error if used outside <OrgProvider>.
 */
import { useContext } from "react";
import { OrgContext } from "./OrgContext";

export function useOrg() {
  const ctx = useContext(OrgContext);
  if (ctx === null) {
    throw new Error(
      "useOrg() must be used inside <OrgProvider>. " +
      "Make sure OrgProvider wraps <AppRoutes /> in App.jsx."
    );
  }
  return ctx;
}
