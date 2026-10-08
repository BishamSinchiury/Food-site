import {
  LuClock3,
  LuPizza,
  LuCircleDot,
} from "react-icons/lu";

import styles from "./PizzaCard.module.css";

export default function PizzaCard({
  image,
  title = "YOUR PIZZA",
  size = 'Medium (12")',
  crust = "Classic",
  toppings = 4,

  sizeIcon = <LuClock3 />,
  crustIcon = <LuPizza />,
  toppingsIcon = <LuCircleDot />,
}) {
  return (
    <article className={styles.card}>
      {/* Header */}
      <div className={styles.title}>
        {title}
      </div>

      {/* Decorative marks */}
      <div className={`${styles.decor} ${styles.decorLeft}`}>
        <span />
        <span />
        <span />
      </div>

      <div className={`${styles.decor} ${styles.decorRight}`}>
        <span />
        <span />
        <span />
      </div>

      {/* Main image */}
      <div className={styles.imageWrapper}>
        <img
          src={image}
          alt={title}
          className={styles.image}
        />
      </div>

      {/* Information */}
      <div className={styles.info}>

        <InfoItem
          icon={sizeIcon}
          label="Size"
          value={size}
        />

        <div className={styles.divider} />

        <InfoItem
          icon={crustIcon}
          label="Crust"
          value={crust}
        />

        <div className={styles.divider} />

        <InfoItem
          icon={toppingsIcon}
          label="Toppings"
          value={toppings}
        />

      </div>
    </article>
  );
}


function InfoItem({ icon, label, value }) {
  return (
    <div className={styles.infoItem}>

      <div className={styles.icon}>
        {icon}
      </div>

      <div className={styles.infoText}>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>

    </div>
  );
}