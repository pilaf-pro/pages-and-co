import { type JSX, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

import LoginModal from '@/features/auth/components/AuthModal';
import { getCartCount } from '@/utils/cartUtils';
import type { Book } from '@/types/book';
import Fuse from 'fuse.js';
import books from '@/data/books.json';
import categories from '@/data/categories.json';
import styles from './index.module.css';

const booksWithGenres = (books as Book[]).map((book) => ({
  ...book,
  genres: book.categoryIds
    .map((id) => categories.find((c) => c.id === id)?.name)
    .filter(Boolean),
}));

const fuse = new Fuse(booksWithGenres, {
  keys: ['title', 'author', 'genres'],
  threshold: 0.4,
  includeScore: true,
});

const Header = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [cartCount, setCartCount] = useState(getCartCount());
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof booksWithGenres>(
    []
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleUpdate = () => {
      setCartCount(getCartCount());
    };
    window.addEventListener('cart-updated', handleUpdate);
    return () => window.removeEventListener('cart-updated', handleUpdate);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      setIsDropdownOpen(false);
    } else {
      const q = query.trim().toLowerCase();

      // Check if query matches a genre name exactly
      const matchedCategory = categories.find(
        (c) => c.name.toLowerCase() === q
      );

      let results: typeof booksWithGenres;

      if (matchedCategory && matchedCategory.id !== 0) {
        // Return all books in that genre first, then pad with fuzzy results
        const genreBooks = booksWithGenres.filter((b) =>
          b.categoryIds.includes(matchedCategory.id)
        );
        const fuzzyBooks = fuse
          .search(query)
          .map((r) => r.item)
          .filter((b) => !b.categoryIds.includes(matchedCategory.id));
        results = [...genreBooks, ...fuzzyBooks].slice(0, 8);
      } else {
        results = fuse
          .search(query)
          .map((r) => r.item)
          .slice(0, 8);
      }

      setSearchResults(results);
      setIsDropdownOpen(true);
    }
  };

  const handleResultClick = (id: number) => {
    setIsDropdownOpen(false);
    setSearchQuery('');
    navigate(`/detail/${id}`);
  };

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
          <div className={styles.header__search} ref={searchRef}>
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
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => {
                if (searchQuery.trim() !== '') setIsDropdownOpen(true);
              }}
            />
            {isDropdownOpen && (
              <div className={styles.searchDropdown}>
                {searchResults.length > 0 ? (
                  searchResults.map((book) => (
                    <div
                      key={book.id}
                      className={styles.searchResultItem}
                      onClick={() => handleResultClick(book.id)}
                    >
                      <div
                        className={styles.searchResultColorBox}
                        style={{
                          background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(255, 255, 255, 0) 100%), ${book.bgColor}`,
                        }}
                      />
                      <div className={styles.searchResultContent}>
                        <div className={styles.searchResultTitle}>
                          {book.title}
                        </div>
                        <div className={styles.searchResultAuthor}>
                          {book.author}
                        </div>
                      </div>
                      <div className={styles.searchResultPrice}>
                        ${book.price.toFixed(2)}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles.searchResultEmpty}>
                    No results found.
                  </div>
                )}
              </div>
            )}
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
