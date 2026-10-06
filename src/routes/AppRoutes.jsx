/**
 * APP ROUTES  —  src/routes/AppRoutes.jsx
 * =========================================
 * Builds the full React Router tree.  Edit routeConfig.jsx to add pages.
 *
 * Tree produced
 * -------------
 *   <BrowserRouter basename={VITE_BASE_PATH || "/"}>
 *     <RouterProviders>                  AuthProvider -> UserProvider
 *       <Suspense fallback={<PageLoader />}>
 *         <Routes>
 *           ...public routes
 *           <Route element={<GuestRoute />}>   ...guest routes   </Route>
 *           <Route element={<PrivateRoute />}> ...private routes </Route>
 *           <Route path="*" element={<NotFound />} />
 *         </Routes>
 *       </Suspense>
 *     </RouterProviders>
 *   </BrowserRouter>
 *
 * Context boundaries (React Router rules)
 * ----------------------------------------
 * - <Routes>, <Route>, <Link>, <Navigate>, <Outlet> and hooks such as
 *   useNavigate / useLocation / useParams only work INSIDE <BrowserRouter>.
 * - <Route> may only be a DIRECT child of <Routes> or another <Route>.
 *   Never wrap a <Route> in a custom component.
 * - Providers that need router hooks must live inside RouterProviders (below).
 *   Providers that do NOT need router hooks (e.g. OrgProvider) live in App.jsx.
 *
 * Configuration
 * -------------
 * - Basename: set VITE_BASE_PATH env var (e.g. "/app") for sub-path deployments.
 * - Guards: see src/routes/guards/README.md
 * - Loading UI: swap out <PageLoader /> below.
 * - 404 page: swap out <NotFound /> below (lazy-loaded).
 */
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes, guestRoutes } from "./routeConfig";
import { AuthProvider } from "@/contexts/auth/AuthContext";
import { UserProvider } from "@/contexts/user/UserContext";
import PrivateRoute from "./guards/PrivateRoute";
import GuestRoute from "./guards/GuestRoute";
import PageLoader from "@/components/PageLoader/PageLoader";
import { composeProviders } from "./composeProviders";

const NotFound = lazy(() => import("@/pages/NotFound"));

// Sub-path deployments: set VITE_BASE_PATH in .env (e.g. VITE_BASE_PATH=/app)
const BASENAME = import.meta.env.VITE_BASE_PATH || "/";

// ---------------------------------------------------------------------------
// RouterProviders — providers that need to be INSIDE the router
// Order matters: AuthProvider first, UserProvider second (depends on auth).
// ---------------------------------------------------------------------------
function RouterProviders({ children }) {
  return (
    <AuthProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </AuthProvider>
  );
}

// ---------------------------------------------------------------------------
// Helper: render a single route entry, applying any per-route providers
// ---------------------------------------------------------------------------
function renderRoute({ path, component: Page, providers }) {
  const element = providers?.length
    ? composeProviders(providers, <Page />)
    : <Page />;

  return <Route key={path} path={path} element={element} />;
}

// ---------------------------------------------------------------------------
// AppRoutes — exported and used in App.jsx
// ---------------------------------------------------------------------------
function AppRoutes() {
  return (
    <BrowserRouter basename={BASENAME}>
      <RouterProviders>
        <Suspense fallback={<PageLoader fullscreen />}>
          <Routes>
            {/* Public pages — no auth check */}
            {publicRoutes.map(renderRoute)}

            {/* Guest pages — redirect authenticated users away */}
            <Route element={<GuestRoute />}>
              {guestRoutes.map(renderRoute)}
            </Route>

            {/* Private pages — redirect unauthenticated users to /login */}
            <Route element={<PrivateRoute />}>
              {privateRoutes.map(renderRoute)}
            </Route>

            {/* 404 — always last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </RouterProviders>
    </BrowserRouter>
  );
}

export default AppRoutes;
