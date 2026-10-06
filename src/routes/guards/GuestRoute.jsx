/**
 * GuestRoute  —  src/routes/guards/GuestRoute.jsx
 * =================================================
 * Pathless layout route that prevents authenticated users from seeing
 * guest-only pages (e.g. /login, /register).
 *
 * Behavior:
 *   - While auth is resolving (isLoading): renders <PageLoader />.
 *   - Authenticated: redirects to state.from (set by PrivateRoute) or /dashboard.
 *   - Not authenticated: renders <Outlet /> (the matched guest page).
 */
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth/useAuth";
import PageLoader from "@/components/PageLoader/PageLoader";

function GuestRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <PageLoader fullscreen />;

  if (isAuthenticated) {
    // Redirect back to the page the user tried to visit, or fall back to dashboard
    const destination = location.state?.from?.pathname || "/dashboard";
    return <Navigate to={destination} replace />;
  }

  return <Outlet />;
}

export default GuestRoute;
