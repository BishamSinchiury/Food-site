import { LuArrowRight, LuHeart } from "react-icons/lu";
import styles from "./Hero.module.css";

import leafImage from "@/assets/29d5411a-69f9-44f9-af0b-853eaf2c29e0.png";
import foodImage from "@/assets/9852646392.png";

export default function Hero() {
  return (
    <section className={styles.hero}>

      {/* Decorative leaf */}
      <img
        src={leafImage}
        alt=""
        className={styles.leafDecoration}
      />

      {/* Decorative orange corner */}
      <div className={styles.orangeCircle} />

      {/* LEFT CONTENT */}
      <div className={styles.content}>

        <div className={styles.eyebrow}>
          <span>Fresh</span>
          <span className={styles.dot}>•</span>
          <span>Healthy</span>
          <span className={styles.dot}>•</span>
          <span>Delicious</span>
        </div>

        <h1>
          Good Food
          <br />
          Brings People Together
        </h1>

        <div className={styles.underline} />

        <p className={styles.description}>
          From fresh ingredients to unforgettable flavors,
          <br />
          we bring you the best food, made with love.
        </p>

        <button className={styles.orderButton}>
          <span>Order Now</span>
          <LuArrowRight size={20} />
        </button>

      </div>

      {/* RIGHT FOOD IMAGE */}
      <div className={styles.imageSection}>

        <img
          src={foodImage}
          alt="Fresh healthy food"
          className={styles.foodImage}
        />

      </div>

      {/* Bottom right orange shape */}
      <div className={styles.bottomShape} />

    </section>
  );
}