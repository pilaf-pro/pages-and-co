import { type JSX, useState, useEffect } from 'react';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CloseIcon from '@mui/icons-material/Close';
import MobileBottomTab from '@/components/layout/MobileBottomTab';
import styles from './index.module.css';

interface MobileStickyBarProps {
  subtotal: number;
  totalItemsCount: number;
  onCheckout: () => void;
}

const MobileStickyBar = ({
  subtotal,
  totalItemsCount,
  onCheckout,
}: MobileStickyBarProps): JSX.Element => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    if (isSheetOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSheetOpen]);

  const handleCheckoutClick = () => {
    setIsSheetOpen(false);
    onCheckout();
  };

  return (
    <>
      {/* Trigger Button inside reused MobileBottomTab */}
      <MobileBottomTab>
        <button
          className={styles.bar__btn}
          onClick={() => setIsSheetOpen(true)}
        >
          <ShoppingBagIcon className={styles.bar__icon} />
          <span className={styles.bar__label}>
            Checkout ({totalItemsCount}) · ${subtotal.toFixed(2)}
          </span>
        </button>
      </MobileBottomTab>

      {/* Bottom Sheet Modal */}
      {isSheetOpen && (
        <div className={styles.overlay} onClick={() => setIsSheetOpen(false)}>
          <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className={styles.sheet__header}>
              <h3 className={styles.sheet__title}>Order summary</h3>
              <button
                className={styles.sheet__close}
                onClick={() => setIsSheetOpen(false)}
              >
                <CloseIcon />
              </button>
            </div>

            {/* Summary rows */}
            <div className={styles.sheet__content}>
              <div className={styles.sheet__row}>
                <span className={styles.sheet__rowLabel}>
                  Subtotal ({totalItemsCount}{' '}
                  {totalItemsCount === 1 ? 'item' : 'items'})
                </span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className={styles.sheet__row}>
                <span className={styles.sheet__rowLabel}>Shipping</span>
                <span className={styles.sheet__free}>Free</span>
              </div>
              <div className={styles.sheet__divider} />
              <div className={`${styles.sheet__row} ${styles.sheet__totalRow}`}>
                <span>Total</span>
                <span className={styles.sheet__totalPrice}>
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <button
                className={styles.sheet__checkoutBtn}
                onClick={handleCheckoutClick}
              >
                Checkout
              </button>
              <p className={styles.sheet__note}>
                You'll be asked to sign in to complete your order.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileStickyBar;
