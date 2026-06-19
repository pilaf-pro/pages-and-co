import { type JSX, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const Footer = (): JSX.Element => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer__top}>
          {/* Col 1 */}
          <div>
            <Link to="/" className={styles.footer__logo}>
              <div className={styles['footer__logo-icon']}>P</div>
              Pages & Co.
            </Link>
            <p className={styles.footer__desc}>
              An independent bookshop for readers who like to take their time.
              Open since 1998.
            </p>
            <div className={styles.footer__socials}>
              <a href="#" className={styles['footer__social-link']}>
                <LinkedInIcon fontSize="small" />
              </a>
              <a href="#" className={styles['footer__social-link']}>
                <XIcon fontSize="small" />
              </a>
              <a href="#" className={styles['footer__social-link']}>
                <FacebookIcon fontSize="small" />
              </a>
            </div>
          </div>

          {/* Col 2 */}
          <div className={styles.footer__section}>
            <h4
              className={styles.footer__title}
              onClick={() => toggleSection('shop')}
            >
              SHOP
              <span className={styles.footer__titleIcon}>
                {openSections['shop'] ? (
                  <ExpandLessIcon fontSize="small" />
                ) : (
                  <ExpandMoreIcon fontSize="small" />
                )}
              </span>
            </h4>
            <ul
              className={`${styles.footer__list} ${openSections['shop'] ? styles['footer__list--open'] : ''}`}
            >
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
          <div className={styles.footer__section}>
            <h4
              className={styles.footer__title}
              onClick={() => toggleSection('about')}
            >
              ABOUT
              <span className={styles.footer__titleIcon}>
                {openSections['about'] ? (
                  <ExpandLessIcon fontSize="small" />
                ) : (
                  <ExpandMoreIcon fontSize="small" />
                )}
              </span>
            </h4>
            <ul
              className={`${styles.footer__list} ${openSections['about'] ? styles['footer__list--open'] : ''}`}
            >
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
          <div className={styles.footer__section}>
            <h4
              className={styles.footer__title}
              onClick={() => toggleSection('help')}
            >
              HELP
              <span className={styles.footer__titleIcon}>
                {openSections['help'] ? (
                  <ExpandLessIcon fontSize="small" />
                ) : (
                  <ExpandMoreIcon fontSize="small" />
                )}
              </span>
            </h4>
            <ul
              className={`${styles.footer__list} ${openSections['help'] ? styles['footer__list--open'] : ''}`}
            >
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
          <div className={styles.footer__section}>
            <h4 className={styles.footer__title}>THE READING ROOM</h4>
            <p className={styles['footer__newsletter-desc']}>
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
      </div>

      <div className={styles.footer__bottomWrapper}>
        <div className={`container ${styles.footer__bottom}`}>
          <p>© 2026 Pages & Co. - Privacy - Terms</p>
          <p>Free shipping on orders over $35</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
