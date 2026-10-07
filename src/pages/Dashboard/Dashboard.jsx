import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth/useAuth";
import { useOrg } from "@/contexts/org/useOrg";
import { useUser } from "@/contexts/user/useUser";
import PageLoader from "@/components/PageLoader/PageLoader";
import styles from "./Dashboard.module.css";

const STATS = [
  { icon: "💰", label: "Revenue today",  value: "$4,280", change: "+12% vs yesterday" },
  { icon: "🍽️", label: "Covers served",  value: "186",    change: "+8% vs last week"  },
  { icon: "⭐", label: "Avg. rating",    value: "4.8",    change: "Stable"             },
];

function Dashboard() {
  const { logout } = useAuth();
  const { data: org, status: orgStatus } = useOrg();
  const { data: user, status: userStatus } = useUser();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  // Show loader while user profile is resolving
  if (userStatus === "loading") {
    return <PageLoader fullscreen label="Loading your dashboard…" />;
  }

  return (
    <div className={styles.page}>
      {/* ---- Header ---------------------------------------------------- */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          {/* Brand + plan */}
          <div className={styles.brand}>
            <span className={styles.brandName}>
              🍽️ {orgStatus === "ready" ? org?.name : "…"}
            </span>
            {org?.plan && (
              <span className={styles.planBadge}>{org.plan}</span>
            )}
          </div>

          {/* User info + logout */}
          <div className={styles.userInfo}>
            {user?.avatarUrl && (
              <img
                src={user.avatarUrl}
                alt={`${user.name} avatar`}
                className={styles.avatar}
              />
            )}
            <span className={styles.userName}>{user?.name}</span>
            <button
              id="logout-btn"
              className={styles.logoutBtn}
              onClick={handleLogout}
              aria-label="Log out"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      {/* ---- Main content ---------------------------------------------- */}
      <main className={styles.main}>
        <div className={styles.greeting}>
          <h1 className={styles.greetingTitle}>
            Good morning, <span>{user?.name?.split(" ")[0] ?? "Chef"}</span> 👋
          </h1>
          <p className={styles.greetingSub}>
            Here&apos;s what&apos;s happening at {org?.name ?? "your restaurant"} today.
          </p>
        </div>

        {/* ---- Stat cards ---------------------------------------------- */}
        <section aria-label="Key metrics">
          {orgStatus === "error" && (
            <p className={styles.statusMsg} role="alert">
              ⚠️ Could not load organisation data. Check your connection.
            </p>
          )}
          <div className={styles.statsGrid}>
            {STATS.map((s) => (
              <article key={s.label} className={styles.statCard}>
                <div className={styles.statIcon} aria-hidden="true">{s.icon}</div>
                <p className={styles.statLabel}>{s.label}</p>
                <p className={styles.statValue}>{s.value}</p>
                <p className={styles.statChange}>{s.change}</p>
              </article>
            ))}
          </div>
          <div className={styles.container}>
          <button
              className={styles.pizzaBtn}
              onClick={() => navigate("/pizza")}
            >
              🍕 Pizza Customize
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
