/**
 * ROUTE CONFIG  —  src/routes/routeConfig.jsx
 * =============================================
 * Single source of truth for every page in the application.
 * Edit THIS file to add, remove, or protect routes.
 *
 * Shape of a route entry
 * ----------------------
 * {
 *   path:      string,              // MUST start with "/"
 *   component: React.lazy(...),     // lazy import — NOT a JSX element
 *   access:    ACCESS.*,            // PUBLIC | PRIVATE | GUEST
 *   providers: [],                  // optional per-route Provider components
 * }
 *
 * Example — private page with its own provider:
 * {
 *   path:      "/projects",
 *   component: lazy(() => import("@/pages/Projects")),
 *   access:    ACCESS.PRIVATE,
 *   providers: [ProjectProvider],   // wraps only this page
 * }
 *
 * Gotchas
 * -------
 * - NEVER use `element:` here — AppRoutes builds elements from `component`.
 *   Using `element:` (JSX) causes issues with lazy loading and type safety.
 * - The wildcard "/*" 404 route is NOT in this config; AppRoutes registers it last.
 * - Duplicate paths will throw during development (validateRoutes()).
 * - `providers` must be an array of components, not instantiated elements.
 *
 * @module routeConfig
 */
import { lazy } from "react";

// ---------------------------------------------------------------------------
// Access levels — frozen so they cannot be mutated at runtime
// ---------------------------------------------------------------------------
export const ACCESS = Object.freeze({
  PUBLIC:  "public",
  PRIVATE: "private",
  GUEST:   "guest",
});

// ---------------------------------------------------------------------------
// Page imports — all lazy so each page is code-split into its own chunk
// ---------------------------------------------------------------------------
const Home      = lazy(() => import("@/pages/Home"));
const Login     = lazy(() => import("@/pages/Login"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Landing   = lazy(() => import("@/pages/Landing/Landing"));

// ---------------------------------------------------------------------------
// Route definitions
// ---------------------------------------------------------------------------

/** @type {RouteEntry[]} */
const routes = [
  {
    path:      "/",
    component: Landing,
    access:    ACCESS.PUBLIC,
    providers: [],
  },
  {
    path:      "/login",
    component: Login,
    access:    ACCESS.GUEST,
    providers: [],
  },
  {
    path:      "/dashboard",
    component: Dashboard,
    access:    ACCESS.PRIVATE,
    providers: [],
  },
];

// ---------------------------------------------------------------------------
// Dev-only validation — throws clear errors during development
// ---------------------------------------------------------------------------
function validateRoutes(routeList) {
  if (import.meta.env.PROD) return; // skip in production builds

  const seen = new Set();
  const validAccess = new Set(Object.values(ACCESS));

  routeList.forEach((route, i) => {
    const label = `routes[${i}] (${route.path ?? "unknown"})`;

    if (!route.path?.startsWith("/")) {
      throw new Error(`[routes] ${label}: path must start with "/".`);
    }
    if (seen.has(route.path)) {
      throw new Error(`[routes] Duplicate path "${route.path}".`);
    }
    seen.add(route.path);

    if (!route.component) {
      throw new Error(
        `[routes] ${label}: missing "component". Did you accidentally use "element" instead?`
      );
    }
    if (!validAccess.has(route.access)) {
      throw new Error(
        `[routes] ${label}: unknown access "${route.access}". Valid values: ${[...validAccess].join(", ")}.`
      );
    }
    if (!Array.isArray(route.providers)) {
      throw new Error(
        `[routes] ${label}: "providers" must be an array of Provider components (got ${typeof route.providers}).`
      );
    }
  });
}

validateRoutes(routes);

// ---------------------------------------------------------------------------
// Exports grouped by access level — consumed by AppRoutes
// ---------------------------------------------------------------------------
export const publicRoutes  = routes.filter((r) => r.access === ACCESS.PUBLIC);
export const privateRoutes = routes.filter((r) => r.access === ACCESS.PRIVATE);
export const guestRoutes   = routes.filter((r) => r.access === ACCESS.GUEST);

/**
 * @typedef {Object} RouteEntry
 * @property {string}                    path      - URL path, must start with "/"
 * @property {React.LazyExoticComponent} component - Lazy-loaded page component
 * @property {"public"|"private"|"guest"} access   - Access control level
 * @property {React.ComponentType[]}     providers - Per-route provider wrappers
 */
