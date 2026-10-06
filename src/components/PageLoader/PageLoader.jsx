/**
 * PageLoader  —  src/components/PageLoader/PageLoader.jsx
 * =========================================================
 * Centered CSS spinner with accessibility attributes.
 *
 * Props:
 *   fullscreen {boolean} - overlay the entire viewport (used in Suspense fallback & guards)
 *   label      {string}  - visible label below spinner (optional)
 */
import styles from "./PageLoader.module.css";

function PageLoader({ fullscreen = false, label }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`${styles.wrapper} ${fullscreen ? styles.fullscreen : ""}`}
    >
      <div className={styles.spinner} />
      {/* Always include a visually-hidden text for screen readers */}
      <span className={styles.srOnly}>Loading…</span>
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
}

export default PageLoader;
