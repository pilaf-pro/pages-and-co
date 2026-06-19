import { type JSX, type ReactNode, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import GridViewIcon from '@mui/icons-material/GridView';
import CategoriesModal from '../CategoriesModal';
import styles from './index.module.css';

interface MobileBottomTabProps {
  children?: ReactNode;
  hideOnScroll?: boolean;
}

export default function MobileBottomTab({
  children,
}: MobileBottomTabProps): JSX.Element | null {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isBodyLocked, setIsBodyLocked] = useState(false);

  // Monitor if any modal is open (all modals lock body scroll with overflow: hidden)
  useEffect(() => {
    const checkBodyLock = () => {
      setIsBodyLocked(document.body.style.overflow === 'hidden');
    };

    // Defer initial check to avoid synchronous setState lint warning
    const timeoutId = setTimeout(checkBodyLock, 0);

    const observer = new MutationObserver(() => {
      checkBodyLock();
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style'],
    });

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  const handleHomeClick = () => {
    setIsCategoriesOpen(false);
    navigate('/');
  };

  const isCheckoutPage = location.pathname === '/checkout';

  // Hide the default tab bar if modal is open, or if on checkout page (unless it's used with children)
  const shouldHide =
    isBodyLocked || isCategoriesOpen || (!children && isCheckoutPage);

  return (
    <>
      <div
        className={`${styles.container} ${shouldHide ? styles.containerHide : ''}`}
      >
        {children ? (
          children
        ) : (
          <>
            <button
              onClick={handleHomeClick}
              className={`${styles.tabBtn} ${location.pathname === '/' && !isCategoriesOpen ? styles.tabBtnActive : ''}`}
            >
              <HomeIcon className={styles.icon} />
              <span className={styles.label}>Home</span>
            </button>

            <button
              onClick={() => setIsCategoriesOpen(true)}
              className={`${styles.tabBtn} ${isCategoriesOpen ? styles.tabBtnActive : ''}`}
            >
              <GridViewIcon className={styles.icon} />
              <span className={styles.label}>Genres</span>
            </button>
          </>
        )}
      </div>

      {!children && (
        <CategoriesModal
          isOpen={isCategoriesOpen}
          onClose={() => setIsCategoriesOpen(false)}
        />
      )}
    </>
  );
}
