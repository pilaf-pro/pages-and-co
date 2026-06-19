import { type JSX } from 'react';
import styles from './index.module.css';

interface CartItemData {
  bookId: number;
  quantity: number;
  book: {
    title: string;
    author: string;
    price: number;
    bgColor: string;
  };
}

interface CartItemCardProps {
  item: CartItemData;
  onRemove: (bookId: number) => void;
  onIncrement: (bookId: number, currentQty: number) => void;
  onDecrement: (bookId: number, currentQty: number) => void;
}

const CartItemCard = ({
  item,
  onRemove,
  onIncrement,
  onDecrement,
}: CartItemCardProps): JSX.Element => {
  return (
    <div className={styles.itemCard}>
      {/* Miniature Cover */}
      <div
        className={styles.cover}
        style={{
          background: `linear-gradient(to bottom right, rgba(0, 0, 0, 0.4) 0%, rgba(255, 255, 255, 0) 100%), ${item.book.bgColor}`,
        }}
      />

      {/* Title & Author Info */}
      <div className={styles.info}>
        <h3 className={styles.title}>{item.book.title}</h3>
        <p className={styles.author}>{item.book.author}</p>
        <button
          onClick={() => onRemove(item.bookId)}
          className={styles.btnRemove}
        >
          Remove
        </button>
      </div>

      {/* Quantity Selector */}
      <div className={styles.quantityContainer}>
        <div className={styles.quantitySelector}>
          <button
            onClick={() => onDecrement(item.bookId, item.quantity)}
            className={styles.quantityBtn}
            aria-label="Decrease quantity"
          >
            —
          </button>
          <span className={styles.quantityValue}>{item.quantity}</span>
          <button
            onClick={() => onIncrement(item.bookId, item.quantity)}
            className={styles.quantityBtn}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Price */}
      <div className={styles.priceContainer}>
        <span className={styles.price}>
          ${(item.book.price * item.quantity).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default CartItemCard;
