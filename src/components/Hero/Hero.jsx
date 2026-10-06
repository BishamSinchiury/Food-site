import { IoLeaf } from "react-icons/io5";
import { LuArrowRight, LuHeart } from "react-icons/lu";
import styles from "./Hero.module.css";

export default function Hero({ image }) {
  return (
    <section className={styles.hero}>
      <span className={styles.blob} />
      <IoLeaf className={styles.sprig} />

      <div className={styles.content}>
        <p className={styles.script}>
          <span>Fresh</span><i>•</i><span>Healthy</span><i>•</i><span>Delicious</span>
        </p>

        <h1 className={styles.title}>
          Good Food
          <br />
          Brings People Together
          <svg className={styles.stroke} viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true">
            <path d="M2 17 C60 8, 160 6, 298 3" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </h1>

        <p className={styles.sub}>
          From fresh ingredients to unforgettable flavors,
          <br />
          we bring you the best food, made with love.
        </p>

        <button className={styles.cta}>
          Order Now <LuArrowRight />
        </button>
      </div>

      <div className={styles.media}>
        <img src={image} alt="Grilled chicken bowl" />
        <div className={styles.note}>
          <span>Good Food<br />Happy You</span>
          <LuHeart />
        </div>
        <span className={styles.mediaBlob} />
      </div>
    </section>
  );
}