import { type JSX } from "react";
import styles from "./index.module.css";

interface BookCardProps {
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  rating: number;
  bgColor: string;
  badge?: string;
}

const BookCard = ({
  title,
  author,
  price,
  originalPrice,
  rating,
  bgColor,
  badge,
}: BookCardProps): JSX.Element => {
  return (
    <article className={styles.card}>
      <div className={styles.card__cover} style={{ backgroundColor: bgColor }}>
        {badge && (
          <span className={styles.card__badge} data-badge={badge}>
            {badge}
          </span>
        )}
        <div className={styles["card__cover-text"]}>
          <h4>{title}</h4>
          <p>{author}</p>
        </div>
      </div>
      <div className={styles.card__info}>
        <h3 className={styles.card__title}>{title}</h3>
        <p className={styles.card__author}>{author}</p>
        <div className={styles.card__meta}>
          <div className={styles.card__pricing}>
            <span className={styles.card__price}>${price.toFixed(2)}</span>
            {originalPrice && (
              <span className={styles["card__price--original"]}>
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <div className={styles.card__rating}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            {rating.toFixed(1)}
          </div>
        </div>
      </div>
    </article>
  );
};

export default BookCard;
