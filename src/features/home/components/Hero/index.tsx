import { type JSX } from "react";
import styles from "./index.module.css";

const Hero = (): JSX.Element => {
  return (
    <section className="container">
      <div className={styles.hero}>
        <div className={styles.hero__content}>
          <p className={styles.hero__kicker}>STAFF FAVOURITES</p>
          <h1 className={styles.hero__title}>
            The shelves
            <br />
            we keep
            <br />
            coming back to
          </h1>
          <p className={styles.hero__desc}>
            Our booksellers pick the titles they can't stop pressing
            <br />
            into customers' hands.
          </p>
          <button className={styles.hero__btn}>Browse bestsellers</button>
        </div>

        {/* Carousel controls - visual only as per snippet */}
        <button className={`${styles.hero__nav} ${styles["hero__nav--prev"]}`}>
          &#8249;
        </button>
        <button className={`${styles.hero__nav} ${styles["hero__nav--next"]}`}>
          &#8250;
        </button>

        <div className={styles.hero__dots}>
          <span className={`${styles.hero__dot}     `}></span>
          <span
            className={`${styles.hero__dot} ${styles["hero__dot--active"]}`}
          ></span>
          <span className={`${styles.hero__dot}     `}></span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
