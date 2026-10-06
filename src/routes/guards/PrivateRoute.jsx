/**
 * PrivateRoute  —  src/routes/guards/PrivateRoute.jsx
 * =====================================================
 * Pathless layout route that protects private pages.
 *
 * Behavior:
 *   - While auth is resolving (isLoading): renders <PageLoader /> (no redirect).
 *     Redirecting while loading causes a loop on page refresh when the user IS
 *     authenticated but the session hasn't been read from localStorage yet.
 *   - Authenticated: renders <Outlet /> (the matched private page).
 *   - Not authenticated: redirects to /login, saves the attempted path in
 *     location.state.from so GuestRoute can redirect back after login.
 */
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth/useAuth";
import PageLoader from "@/components/PageLoader/PageLoader";

function PrivateRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Wait for session resolution — avoids false redirect on deep-link refresh
  if (isLoading) return <PageLoader fullscreen />;

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }} // GuestRoute reads this to redirect back
      />
    );
  }

  return <Outlet />;
}

export default PrivateRoute;
