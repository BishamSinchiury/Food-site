# Route Guards

Both guards are **pathless layout routes** — they render no UI of their own
but control access by either rendering `<Outlet />` or a `<Navigate />`.

## PrivateRoute

Protects routes with `access: ACCESS.PRIVATE`.

```
<Route element={<PrivateRoute />}>
  <Route path="/dashboard" element={<Dashboard />} />
</Route>
```

Flow:
1. `isLoading === true` → show `<PageLoader />` (prevents false redirect on refresh)
2. `isAuthenticated === false` → `<Navigate to="/login" state={{ from: location }} />`
3. Otherwise → `<Outlet />`

## GuestRoute

Protects routes with `access: ACCESS.GUEST` (e.g. `/login`).
If an authenticated user hits `/login`, they are redirected to `state.from.pathname`
(the page PrivateRoute saved) or fall back to `/dashboard`.

## Adding a new guard

1. Create `MyGuard.jsx` in this folder.
2. Import and use it as a pathless layout route in `AppRoutes.jsx`.
3. Add a matching `ACCESS.*` constant to `routeConfig.jsx`.
