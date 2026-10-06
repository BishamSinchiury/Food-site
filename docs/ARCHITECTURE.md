# Architecture Guide

> Last updated: October 2026  
> Stack: Vite + React 19 + react-router-dom v7 + CSS Modules

---

## 1. Folder Map

```
src/
  main.jsx                  Entry point — imports global CSS, renders <App />
  App.jsx                   Top-level — providers above the router
  styles/
    tokens.css              CSS custom properties (colors, spacing, fonts…)
    global.css              Box-sizing reset + base typography; imports tokens.css
  routes/
    AppRoutes.jsx           Builds the BrowserRouter tree from routeConfig
    routeConfig.jsx         SINGLE source of truth — the route array
    composeProviders.jsx    Helper: wraps an element in per-route providers
    guards/
      PrivateRoute.jsx      Redirects unauthenticated users to /login
      GuestRoute.jsx        Redirects authenticated users away from /login
      README.md             Guard documentation
  contexts/
    auth/
      AuthContext.jsx       Provider + context object
      useAuth.js            Hook (throws if used outside provider)
      authApi.js            Mock login/logout/session + TODO comments for real API
    org/
      OrgContext.jsx        Provider + context object
      useOrg.js             Hook
      orgApi.js             Mock fetchOrg + TODO for real API
    user/
      UserContext.jsx       Provider (depends on AuthContext)
      useUser.js            Hook
      userApi.js            Mock fetchUser + TODO for real API
  components/
    PageLoader/             Accessible CSS spinner
    ErrorBoundary/          Class component — catches all render errors
  pages/
    Home/                   Public landing page
    Login/                  Guest-only login form
    Dashboard/              Private dashboard with stats
    NotFound/               404 fallback
  docs/
    ARCHITECTURE.md         This file
```

---

## 2. Provider Layering

```
<ErrorBoundary>                         ← catches crashes everywhere
  <OrgProvider>                         ← outside router; no router hooks needed
    <BrowserRouter>                     ← router context starts HERE
      <AuthProvider>                    ← inside router (may need useNavigate)
        <UserProvider>                  ← depends on AuthContext
          <Suspense>
            <Routes>...</Routes>
          </Suspense>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </OrgProvider>
</ErrorBoundary>
```

### Why this order?

| Rule | Consequence |
|---|---|
| Router hooks (`useNavigate`, `useLocation`…) only work **inside** `<BrowserRouter>` | `AuthProvider` and `UserProvider` must be inside the router |
| `UserProvider` reads `isAuthenticated` from `AuthContext` | `UserProvider` must be **below** `AuthProvider` |
| `OrgProvider` does not need router hooks (yet) | It sits **above** `<BrowserRouter>` for a smaller bundle in `App.jsx` |
| `ErrorBoundary` must not use `<Link>` | It uses a plain `<a href="/">` for the recovery button |

**If OrgProvider later needs the auth token** (e.g. to pass `Authorization` headers),
move it inside `RouterProviders` in `AppRoutes.jsx`, placing it **below** `AuthProvider`.

---

## 3. How to Add a Page

### Public page

1. Create `src/pages/MyPage/MyPage.jsx` + `MyPage.module.css` + `index.js`.
2. Add to `routeConfig.jsx`:

```js
{
  path:      "/my-page",
  component: lazy(() => import("@/pages/MyPage")),
  access:    ACCESS.PUBLIC,
  providers: [],
}
```

### Private page (requires login)

Same as above, but `access: ACCESS.PRIVATE`. Done.

### Guest-only page (e.g. signup)

Same as above, but `access: ACCESS.GUEST`.

### Page with its own provider

```js
// In routeConfig.jsx
import { ProjectProvider } from "@/contexts/project/ProjectContext";

{
  path:      "/projects",
  component: lazy(() => import("@/pages/Projects")),
  access:    ACCESS.PRIVATE,
  providers: [ProjectProvider],   // composeProviders wraps <Projects /> in this
}
```

`composeProviders` wraps the **page element** — NOT the `<Route>` — so
React Router's rule ("Route may only be a direct child of Routes") is respected.

---

## 4. How to Add a New Global Context

Checklist:

- [ ] Create `src/contexts/myFeature/myFeatureApi.js`
  - Export async functions with `@typedef` JSDoc
  - Accept `AbortSignal` parameter
  - Include `TODO:` comment showing where real `fetch()` goes
- [ ] Create `src/contexts/myFeature/MyFeatureContext.jsx`
  - Use `AbortController` + `useRef` for cancellation
  - Expose `{ data, status, error, refresh }` shape
  - `useMemo` the context value
- [ ] Create `src/contexts/myFeature/useMyFeature.js`
  - `useContext` with null-check that throws a readable error
- [ ] Decide placement:
  - Needs router hooks → add to `RouterProviders` in `AppRoutes.jsx`
  - Depends on auth → place **below** `AuthProvider` in `RouterProviders`
  - No router dependency → add to `App.jsx` above `<AppRoutes />`
- [ ] (Optional) Add `VITE_USE_MOCK_MY_FEATURE` env var
- [ ] Add variable to `.env.example` with default and description

---

## 5. Replacing a Mock API with a Real One

Each `*Api.js` file is the **only file you touch** when switching to a real backend.

| File | Env var to set | What to do |
|---|---|---|
| `authApi.js` | `VITE_USE_MOCK_AUTH=false` | Fill in the `TODO` fetch blocks for `login`, `getSession`, `logout` |
| `orgApi.js`  | `VITE_USE_MOCK_ORG=false`  | Fill in the `TODO` fetch block in `fetchOrg` |
| `userApi.js` | _(no env var — always live)_ | Replace the mock return in `fetchUser` |

All response shapes are documented with `@typedef` in each API file.

---

## 6. Environment Variables

| Variable | Default | Description |
|---|---|---|
| `VITE_BASE_PATH` | `/` | URL prefix for sub-path deployments (e.g. `/app`) |
| `VITE_USE_MOCK_AUTH` | `true` | When `false`, authApi.js uses real fetch |
| `VITE_USE_MOCK_ORG` | `true` | When `false`, orgApi.js uses real fetch |
| `VITE_API_URL` | _(empty)_ | Base URL for real API calls |

Copy `.env.example` to `.env` and fill in values.

---

## 7. Debugging Guide

### `useNavigate() may be used only in the context of a Router`
**Cause:** A provider that calls `useNavigate` (or imports a component that does)
is placed **above** `<BrowserRouter>`.  
**Fix:** Move that provider into `RouterProviders` in `AppRoutes.jsx`.

---

### `useOrg() must be used inside <OrgProvider>`
**Cause:** `useOrg()` was called in a component rendered before `<OrgProvider>`.  
**Fix:** Ensure `<OrgProvider>` wraps `<AppRoutes />` in `App.jsx`.

---

### `<Route> is only ever to be used as the child of <Routes>`
**Cause:** A `<Route>` was wrapped in a custom component (e.g. a guard that
returns `<Route ...>` instead of using `<Outlet>`).  
**Fix:** Guards must be pathless layout routes that render `<Outlet />` or
`<Navigate />` — never `<Route>`.

---

### Redirect loop on login
**Cause:** `PrivateRoute` redirected to `/login` while `isLoading` was still
`true`, so the session hadn't been read from localStorage yet.  
**Fix:** `PrivateRoute` shows `<PageLoader />` while `isLoading`, never redirecting
until auth state is resolved. This is already implemented.

---

### Blank screen on deep-link refresh (`/dashboard` → 404)
**Cause:** The server returned 404 for `/dashboard` because it served static files
and didn't fall back to `index.html` for SPA routes.  
**Fix:**
- **Vite dev server**: already handles this automatically.
- **Nginx**: add `try_files $uri /index.html;`
- **Apache**: add `FallbackResource /index.html` or equivalent `.htaccess` RewriteRule.
- **Vercel / Netlify**: add a `vercel.json` or `_redirects` file with a wildcard rewrite.
- **basename**: if deploying under a sub-path, set `VITE_BASE_PATH=/your-path` and
  configure the server to serve `index.html` from that path.

---

### Session lost after refresh
**Cause:** `getSession()` in `authApi.js` threw during a `localStorage` read.  
**Fix:** All `localStorage` accesses are already wrapped in `safeLocalStorage()`
with try/catch. Check DevTools → Application → Local Storage for the `auth_token` key.
