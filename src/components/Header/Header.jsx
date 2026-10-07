import { useState } from "react";
import { IoLeaf } from "react-icons/io5";
import { LuSearch, LuUser, LuShoppingCart } from "react-icons/lu";
import styles from "./Header.module.css";

const links = ["Home", "Menu", "About", "Contact"];

export default function Header({ cartCount = 0 }) {
  const [active, setActive] = useState("Home");

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* 1. Logo */}
        <a href="#home" className={styles.logo}>
          <IoLeaf className={styles.logoIcon} />
          <span className={styles.logoText}>
            <span className={styles.brand}>GoodBite</span>
            <span className={styles.tagline}>Good Food. Better Mood.</span>
          </span>
        </a>

        {/* 2. Links */}
        <nav className={styles.links}>
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

        {/* 3. Icons */}
        <div className={styles.actions}>
          <button className={styles.iconBtn} aria-label="Search">
            <LuSearch />
          </button>
          <button className={styles.iconBtn} aria-label="Account">
            <LuUser />
          </button>
          <button className={styles.iconBtn} aria-label="Cart">
            <LuShoppingCart />
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}