/**
 * composeProviders  —  src/routes/composeProviders.jsx
 * ======================================================
 * Wraps a React element in an ordered list of Provider components.
 * Used by AppRoutes to apply per-route providers without touching the
 * <Route> tree (React Router prohibits wrapping <Route> in custom components).
 *
 * Usage:
 *   composeProviders([ThemeProvider, ProjectProvider], <Dashboard />)
 *   // returns: <ThemeProvider><ProjectProvider><Dashboard /></ProjectProvider></ThemeProvider>
 *
 * Providers are applied left-to-right (outermost first), matching the array order.
 *
 * @param {React.ComponentType[]} providers  - Provider components (no props needed)
 * @param {React.ReactElement}    element    - The page element to wrap
 * @returns {React.ReactElement}
 */
export function composeProviders(providers, element) {
  // Reduce right-to-left so the first item in the array is the outermost wrapper
  return providers.reduceRight(
    (child, Provider) => <Provider>{child}</Provider>,
    element
  );
}
