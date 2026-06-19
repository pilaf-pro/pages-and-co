import { type JSX } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import { truncateWords, truncateSmartMobileTitle } from '@/utils/textUtils';

interface BookCardProps {
  id: number;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  rating: number;
  bgColor: string;
  badge?: string;
}
const BookCard = ({
  id,
  title,
  author,
  price,
  originalPrice,
  rating,
  bgColor,
  badge,
}: BookCardProps): JSX.Element => {
  return (
    <Link to={`/detail/${id}`} className={styles.card}>
      <div
        className={styles.card__cover}
        style={{
          background: `linear-gradient(to bottom right, rgba(0, 0, 0, 0.6) 0%, rgba(255, 255, 255, 0) 100%), ${bgColor}`,
        }}
      >
        {badge && (
          <span className={styles.card__badge} data-badge={badge}>
            {badge}
          </span>
        )}
        <div className={styles['card__cover-text']}>
          <h4>{title}</h4>
          <p>{author}</p>
        </div>
      </div>
      <div className={styles.card__info}>
        <h3 className={styles.card__title}>
          <span className={styles['card__title--mobile']}>
            {truncateSmartMobileTitle(title)}
          </span>
          <span className={styles['card__title--desktop']}>
            {truncateWords(title, 4)}
          </span>
        </h3>
        <p className={styles.card__author}>{author}</p>
        <div className={styles.card__meta}>
          <div className={styles.card__pricing}>
            <span className={styles.card__price}>${price.toFixed(2)}</span>
            {originalPrice && (
              <span className={styles['card__price--original']}>
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <div className={styles.card__rating}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={styles['card__rating-icon']}
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            {rating.toFixed(1)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
