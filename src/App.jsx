/**
 * App  —  src/App.jsx
 * =====================
 * Top-level component. Providers placed HERE are outside the router, so they
 * must NOT use any React Router hooks (useNavigate, useLocation, etc.).
 *
 * Provider order (outermost → innermost):
 *   ErrorBoundary       catches crashes everywhere, uses plain <a> not <Link>
 *   OrgProvider         no router dependency; loads org on mount
 *   AppRoutes           contains BrowserRouter + RouterProviders (auth, user)
 *
 * If OrgProvider later needs the auth token (e.g. Authorization header),
 * move it INSIDE RouterProviders in AppRoutes.jsx, below AuthProvider.
 */
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import { OrgProvider } from "@/contexts/org/OrgContext";
import AppRoutes from "@/routes/AppRoutes";

function App() {
  return (
    <ErrorBoundary>
      <OrgProvider>
        <AppRoutes />
      </OrgProvider>
    </ErrorBoundary>
  );
}

export default App;
