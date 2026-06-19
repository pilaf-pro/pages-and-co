import { type JSX } from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.css";

const Header = (): JSX.Element => {
  return (
    <header className={styles["header-wrapper"]}>
      <div className={`container ${styles.header}`}>
        {/* Logo */}
        <Link to="/" className={styles.header__left}>
          <div className={styles["header__logo-icon"]}>P</div>
          <span>Pages & Co.</span>
        </Link>

        {/* Navigation */}
        <nav className={styles.header__nav}>
          <ul className={styles["header__nav-list"]}>
            <li>
              <Link to="/" className={styles["header__nav-link"]}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className={styles["header__nav-link"]}>
                Shop All
              </Link>
            </li>
            <li>
              <Link to="/fiction" className={styles["header__nav-link"]}>
                Fiction
              </Link>
            </li>
            <li>
              <Link to="/mystery" className={styles["header__nav-link"]}>
                Mystery
              </Link>
            </li>
            <li>
              <Link to="/children" className={styles["header__nav-link"]}>
                Children
              </Link>
            </li>
            <li>
              <Link to="/poetry" className={styles["header__nav-link"]}>
                Poetry
              </Link>
            </li>
          </ul>
        </nav>

        {/* Actions */}
        <div className={styles.header__actions}>
          <div className={styles.header__search}>
            <svg
              className={styles["header__search-icon"]}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search titles, authors..."
              className={styles["header__search-input"]}
            />
          </div>

          <button className={styles.header__signin}>Sign in</button>

          <button className={styles.header__bag}>
            Bag <span className={styles["header__bag-count"]}>0</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
