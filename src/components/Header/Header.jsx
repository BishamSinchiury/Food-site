import { useState } from "react";
import { IoLeaf } from "react-icons/io5";
import { LuSearch, LuUser, LuShoppingCart } from "react-icons/lu";
import styles from "./Header.module.css";

const links = ["Home", "Menu", "About", "Contact"];

export default function Header({ cartCount = 0 }) {
  const [active, setActive] = useState("Home");

  return (
    <header className={styles.header}>
      <a href="/" className={styles.logo}>
        <IoLeaf className={styles.logoIcon} />
        <div>
          <span className={styles.brand}>GoodBite</span>
          <span className={styles.tagline}>Good Food. Better Mood.</span>
        </div>
      </a>

      <nav className={styles.nav}>
        {links.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className={`${styles.link} ${active === link ? styles.active : ""}`}
            onClick={() => setActive(link)}
          >
            {link}
          </a>
        ))}
      </nav>

      <div className={styles.actions}>
        <button className={styles.iconBtn} aria-label="Search"><LuSearch /></button>
        <button className={styles.iconBtn} aria-label="Account"><LuUser /></button>
        <button className={styles.iconBtn} aria-label="Cart">
          <LuShoppingCart />
          <span className={styles.badge}>{cartCount}</span>
        </button>
      </div>
    </header>
  );
}