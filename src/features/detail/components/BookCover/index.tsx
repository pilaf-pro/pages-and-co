import { type JSX } from 'react';
import styles from './index.module.css';

interface BookCoverProps {
  title: string;
  author: string;
  bgColor: string;
  badge?: string;
}

const BookCover = ({
  title,
  author,
  bgColor,
  badge,
}: BookCoverProps): JSX.Element => {
  return (
    <div className={styles.coverContainer}>
      <div
        className={styles.cover}
        style={{
          background: `linear-gradient(to bottom right, rgba(0, 0, 0, 0.6) 0%, rgba(255, 255, 255, 0) 100%), ${bgColor}`,
        }}
      >
        {badge && (
          <span className={styles.card__badge} data-badge={badge}>
            {badge}
          </span>
        )}
        <div className={styles.coverText}>
          <h2>{title}</h2>
          <p>{author}</p>
        </div>
      </div>
    </div>
  );
};

export default BookCover;
