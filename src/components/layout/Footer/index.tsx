import { type JSX } from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.css";

const Footer = (): JSX.Element => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer__top}>
          {/* Col 1 */}
          <div>
            <Link to="/" className={styles.footer__logo}>
              <div className={styles["footer__logo-icon"]}>P</div>
              Pages & Co.
            </Link>
            <p className={styles.footer__desc}>
              An independent bookshop for readers who like to take their time.
              Open since 1998.
            </p>
            <div className={styles.footer__socials}>
              <a href="#" className={styles["footer__social-link"]}>
                in
              </a>
              <a href="#" className={styles["footer__social-link"]}>
                x
              </a>
              <a href="#" className={styles["footer__social-link"]}>
                f
              </a>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className={styles.footer__title}>SHOP</h4>
            <ul className={styles.footer__list}>
              <li>
                <Link to="/new" className={styles.footer__link}>
                  New arrivals
                </Link>
              </li>
              <li>
                <Link to="/bestsellers" className={styles.footer__link}>
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link to="/fiction" className={styles.footer__link}>
                  Fiction
                </Link>
              </li>
              <li>
                <Link to="/children" className={styles.footer__link}>
                  Children
                </Link>
              </li>
              <li>
                <Link to="/gift-cards" className={styles.footer__link}>
                  Gift cards
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className={styles.footer__title}>ABOUT</h4>
            <ul className={styles.footer__list}>
              <li>
                <Link to="/story" className={styles.footer__link}>
                  Our story
                </Link>
              </li>
              <li>
                <Link to="/events" className={styles.footer__link}>
                  Events
                </Link>
              </li>
              <li>
                <Link to="/visit" className={styles.footer__link}>
                  Visit the shop
                </Link>
              </li>
              <li>
                <Link to="/journal" className={styles.footer__link}>
                  Journal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className={styles.footer__title}>HELP</h4>
            <ul className={styles.footer__list}>
              <li>
                <Link to="/shipping" className={styles.footer__link}>
                  Shipping
                </Link>
              </li>
              <li>
                <Link to="/returns" className={styles.footer__link}>
                  Returns
                </Link>
              </li>
              <li>
                <Link to="/faq" className={styles.footer__link}>
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className={styles.footer__link}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5 */}
          <div>
            <h4 className={styles.footer__title}>THE READING ROOM</h4>
            <p className={styles["footer__newsletter-desc"]}>
              One handpicked recommendation in your inbox each week.
            </p>
            <form
              className={styles.footer__form}
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Email address"
                className={styles.footer__input}
              />
              <button type="submit" className={styles.footer__btn}>
                Join
              </button>
            </form>
          </div>
        </div>

        <div className={styles.footer__bottom}>
          <p>© 2026 Pages & Co. - Privacy - Terms</p>
          <p>Free shipping on orders over $35</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
