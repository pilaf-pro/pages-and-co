import { type JSX } from 'react';
import styles from './index.module.css';

const PromoBanner = (): JSX.Element => {
  return (
    <section className="container">
      <div className={styles.banner}>
        <div className={styles.banner__content}>
          <p className={styles.banner__kicker}>THE READING ROOM</p>
          <h2 className={styles.banner__title}>
            Free shipping on
            <br />
            every order over $35
          </h2>
          <p className={styles.banner__desc}>
            Plus 15% off your first month and a weekly
            <br />
            recommendation picked just for you.
          </p>
        </div>
        <button className={styles.banner__btn}>Join free</button>
      </div>
    </section>
  );
};

export default PromoBanner;
