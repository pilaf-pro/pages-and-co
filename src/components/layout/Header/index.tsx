import { type JSX, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LoginModal from '@/features/auth/components/LoginModal';
import { getCartCount } from '@/utils/cartUtils';
import styles from './index.module.css';

const Header = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [cartCount, setCartCount] = useState(getCartCount());

  useEffect(() => {
    const handleUpdate = () => {
      setCartCount(getCartCount());
    };
    window.addEventListener('cart-updated', handleUpdate);
    return () => window.removeEventListener('cart-updated', handleUpdate);
  }, []);

  return (
    <>
      <header className={styles['header-wrapper']}>
        <div className={`container ${styles.header}`}>
          {/* Left: Logo */}
          <div className={styles.header__leftContainer}>
            <Link to="/" className={styles.header__left}>
              <div className={styles['header__logo-icon']}>P</div>
              <span className={styles.header__logoText}>Pages & Co.</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav
            className={`${styles.header__nav} ${isMobileMenuOpen ? styles['header__nav--open'] : ''}`}
          >
            <ul className={styles['header__nav-list']}>
              <li>
                <Link
                  to="/"
                  className={styles['header__nav-link']}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/books/0"
                  className={styles['header__nav-link']}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shop All
                </Link>
              </li>
              <li>
                <Link
                  to="/books/1"
                  className={styles['header__nav-link']}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Fiction
                </Link>
              </li>
              <li>
                <Link
                  to="/books/2"
                  className={styles['header__nav-link']}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Mystery
                </Link>
              </li>
              <li>
                <Link
                  to="/books/6"
                  className={styles['header__nav-link']}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Children
                </Link>
              </li>
              <li>
                <Link
                  to="/books/5"
                  className={styles['header__nav-link']}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
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
            <button
              className={styles.header__signin}
              onClick={() => setIsLoginModalOpen(true)}
            >
              <span className={styles.header__actionText}>Sign in</span>
              <PersonIcon className={styles.header__actionIcon} />
            </button>

            <Link to="/checkout" className={styles.header__bag}>
              <span className={styles.header__actionText}>Bag</span>
              <ShoppingBagIcon className={styles.header__actionIcon} />
              <span className={styles['header__bag-count']}>{cartCount}</span>
            </Link>
          </div>
        </div>
      </header>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};

export default Header;
