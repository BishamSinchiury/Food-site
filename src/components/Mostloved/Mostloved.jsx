import { LuArrowRight } from "react-icons/lu";
import FoodCard from "../FoodCard/FoodCard";
import styles from "./MostLoved.module.css";

export default function MostLoved({ items, onAdd }) {
  return (
    <section className={styles.section}>
      <span className={styles.blobLeft} />
      <span className={styles.blobGreen1} />
      <span className={styles.blobGreen2} />

      <div className={styles.inner}>
        <div className={styles.head}>
          <div className={styles.titleWrap}>
            <svg className={styles.sparkL} viewBox="0 0 30 40" aria-hidden="true">
              <path d="M2 4 L14 14 M2 24 L14 24 M4 36 L14 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
            <p className={styles.eyebrow}>OUR MOST LOVED</p>
            <svg className={styles.sparkR} viewBox="0 0 30 40" aria-hidden="true">
              <path d="M6 4 L12 14 M14 22 L26 18 M8 26 L22 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
            <h2 className={styles.title}>Cut from Our Most Loved</h2>
          </div>

          <a href="#menu" className={styles.viewAll}>
            View All <LuArrowRight />
          </a>
        </div>

        <div className={styles.grid}>
          {items.map((item) => (
            <FoodCard key={item.id} item={item} onAdd={onAdd} />
          ))}
        </div>
      </div>
    </section>
  );
}