/**
 * Login  —  src/pages/Login/Login.jsx
 * =====================================
 * Guest-only page (redirected away when authenticated via GuestRoute).
 * Calls useAuth().login(), then navigates to the saved state.from or /dashboard.
 * Shows the org name from useOrg() as a subtitle so context wiring is visible.
 */
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/contexts/auth/useAuth";
import { useOrg } from "@/contexts/org/useOrg";
import styles from "./Login.module.css";

function Login() {
  const { login, isLoading } = useAuth();
  const { data: org } = useOrg();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Redirect destination — PrivateRoute saves this in state.from
  const destination = location.state?.from?.pathname || "/dashboard";

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const isBusy = submitting || isLoading;

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        {/* ---- Brand --------------------------------------------------- */}
        <div className={styles.header}>
          <p className={styles.logo}>🍽️ {org?.name ?? "FreshTable"}</p>
          <h1 className={styles.heading}>Welcome back</h1>
          <p className={styles.subtitle}>
            Sign in to your {org?.name ?? "FreshTable"} account
          </p>
        </div>

        {/* ---- Form ---------------------------------------------------- */}
        <form
          className={styles.form}
          onSubmit={handleSubmit}
          aria-label="Login form"
          noValidate
        >
          <div className={styles.fieldGroup}>
            <label htmlFor="email" className={styles.label}>
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className={styles.input}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isBusy}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className={styles.input}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isBusy}
            />
          </div>

          {/* Inline error — role="alert" reads to screen readers immediately */}
          {error && (
            <div role="alert" className={styles.errorBox} aria-live="assertive">
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isBusy || !email || !password}
          >
            {isBusy ? "Signing in…" : "Sign in →"}
          </button>
        </form>

        {/* ---- Demo hint ----------------------------------------------- */}
        <p className={styles.hint}>
          🧪 Demo: any email, password 4+ characters
        </p>

        <p className={styles.homeLink}>
          <Link to="/">← Back to home</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
