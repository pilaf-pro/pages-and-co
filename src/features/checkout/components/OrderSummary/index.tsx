import { type JSX } from 'react';
import styles from './index.module.css';

interface OrderSummaryProps {
  subtotal: number;
  totalItemsCount: number;
  onCheckout: () => void;
}

const OrderSummary = ({
  subtotal,
  totalItemsCount,
  onCheckout,
}: OrderSummaryProps): JSX.Element => {
  return (
    <div className={styles.summaryContainer}>
      <div className={styles.summaryCard}>
        <h2 className={styles.summaryTitle}>Order summary</h2>

        <div className={styles.summaryRow}>
          <span>
            Subtotal ({totalItemsCount}{' '}
            {totalItemsCount === 1 ? 'item' : 'items'})
          </span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className={styles.summaryRow}>
          <span>Shipping</span>
          <span className={styles.shippingFree}>Free</span>
        </div>

        <div className={styles.divider} />

        <div className={`${styles.summaryRow} ${styles.totalRow}`}>
          <span>Total</span>
          <span className={styles.totalPrice}>${subtotal.toFixed(2)}</span>
        </div>

        <button className={styles.btnCheckout} onClick={onCheckout}>
          Checkout
        </button>

        <p className={styles.checkoutNote}>
          You'll be asked to sign in to complete your order.
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
