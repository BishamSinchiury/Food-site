/**
 * Home  —  src/pages/Home/Home.jsx
 * ==================================
 * Public landing page. Shows org branding and links to login or dashboard
 * depending on the user's auth state.
 */
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/auth/useAuth";
import { useOrg } from "@/contexts/org/useOrg";
import styles from "./Home.module.css";

const FEATURES = [
  {
    icon: "🍽️",
    title: "Smart Menus",
    description: "Build beautiful, seasonal menus with drag-and-drop simplicity.",
  },
  {
    icon: "📊",
    title: "Live Analytics",
    description: "Track revenue, covers, and trends in real time across all locations.",
  },
  {
    icon: "🤝",
    title: "Team Collaboration",
    description: "Role-based access so chefs, managers, and owners see what they need.",
  },
];

function Home() {
  const { isAuthenticated } = useAuth();
  const { data: org, status } = useOrg();

  const orgName = status === "ready" && org ? org.name : "FreshTable";

  return (
    <div className={styles.page}>
      <main>
        {/* ---- Hero ---------------------------------------------------- */}
        <section className={styles.hero} aria-label="Hero">
          <div className={styles.heroInner}>
            <span className={styles.badge}>✨ Restaurant OS Platform</span>

            <h1 className={styles.title}>
              Run your restaurant <br />
              <span className={styles.titleAccent}>smarter with {orgName}</span>
            </h1>

            <p className={styles.subtitle}>
              Everything your team needs to manage menus, track orders, and grow
              your{" "}
              <span className={styles.orgName}>{orgName}</span> business — in one
              beautiful dashboard.
            </p>

            <div className={styles.actions}>
              {isAuthenticated ? (
                <Link to="/dashboard" className={styles.btnPrimary}>
                  Open Dashboard →
                </Link>
              ) : (
                <>
                  <Link to="/login" className={styles.btnPrimary}>
                    Get Started Free →
                  </Link>
                  <a
                    href="#features"
                    className={styles.btnSecondary}
                  >
                    See Features
                  </a>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ---- Features ------------------------------------------------ */}
        <section id="features" aria-label="Features">
          <div className={styles.features}>
            {FEATURES.map((f) => (
              <article key={f.title} className={styles.featureCard}>
                <div className={styles.featureIcon} aria-hidden="true">
                  {f.icon}
                </div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
