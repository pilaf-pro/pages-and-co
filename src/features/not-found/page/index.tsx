import { type JSX } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './index.module.css';

const NotFoundPage = (): JSX.Element => {
  const location = useLocation();

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.errorCode}>
            <span className={`${styles.digit} ${styles.digit1}`}>4</span>
            <span className={`${styles.zeroCircle} ${styles.char2}`}>0</span>
            <span className={`${styles.digit} ${styles.digit3}`}>4</span>
          </div>

          <h1 className={styles.title}>Page Not Found</h1>
          <p className={styles.description}>
            Oops! The page{' '}
            <span className={styles.path}>{location.pathname}</span> doesn't
            exist or has been moved.
          </p>

          <div className={styles.actions}>
            <Link to="/" className={styles.btnPrimary}>
              Back to Home
            </Link>
            <Link to="/books" className={styles.btnSecondary}>
              Browse Books
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
