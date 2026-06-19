import { type JSX, useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import styles from './index.module.css';

const Header = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={styles['header-wrapper']}>
      <div className={`container ${styles.header}`}>
        {/* Left: Mobile Menu + Logo */}
        <div className={styles.header__leftContainer}>
          <button
            className={styles.header__mobileMenuBtn}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <MenuIcon />
          </button>
          <Link to="/" className={styles.header__left}>
            <div className={styles['header__logo-icon']}>P</div>
            <span>Pages & Co.</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav
          className={`${styles.header__nav} ${isMobileMenuOpen ? styles['header__nav--open'] : ''}`}
        >
          <ul className={styles['header__nav-list']}>
            <li>
              <Link to="/" className={styles['header__nav-link']}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/books/All" className={styles['header__nav-link']}>
                Shop All
              </Link>
            </li>
            <li>
              <Link to="/books/Fiction" className={styles['header__nav-link']}>
                Fiction
              </Link>
            </li>
            <li>
              <Link to="/books/Mystery" className={styles['header__nav-link']}>
                Mystery
              </Link>
            </li>
            <li>
              <Link to="/books/Children" className={styles['header__nav-link']}>
                Children
              </Link>
            </li>
            <li>
              <Link to="/books/Poetry" className={styles['header__nav-link']}>
                Poetry
              </Link>
            </li>
          </ul>
        </nav>

        {/* Search */}
        <div className={styles.header__search}>
          <svg
            className={styles['header__search-icon']}
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
            className={styles['header__search-input']}
          />
        </div>

        {/* Actions */}
        <div className={styles.header__actions}>
          <button className={styles.header__signin}>
            <span className={styles.header__actionText}>Sign in</span>
            <PersonIcon className={styles.header__actionIcon} />
          </button>

          <button className={styles.header__bag}>
            <span className={styles.header__actionText}>Bag</span>
            <ShoppingBagIcon className={styles.header__actionIcon} />
            <span className={styles['header__bag-count']}>0</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
