/**
 * NotFound  —  src/pages/NotFound/NotFound.jsx
 * ==============================================
 * Rendered for the wildcard "/*" route in AppRoutes.
 * Provides a link back to home; no auth context required.
 */
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <p className={styles.code} aria-hidden="true">404</p>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.body}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Double-check the URL, or head back home.
        </p>
        <Link to="/" className={styles.homeLink}>
          ← Back to home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
