import { LuHeart } from "react-icons/lu";
import styles from "./FoodCard.module.css";

export default function FoodCard({ item, onAdd }) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={item.image} alt={item.name} />
        <button className={styles.fav} aria-label="Add to favourites">
          <LuHeart />
        </button>
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{item.name}</h3>
        <p className={styles.desc}>{item.description}</p>
        <span className={styles.price}>${item.price.toFixed(2)}</span>
        <button className={styles.add} onClick={() => onAdd?.(item)}>
          Add to Cart
        </button>
      </div>
    </article>
  );
}