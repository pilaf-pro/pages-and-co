import { type JSX, useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import books from '@/data/books.json';
import {
  getCart,
  removeFromCart,
  updateQuantity,
  type CartItem,
} from '@/utils/cartUtils';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHeader from '@/components/ui/PageHeader';
import CartItemCard from '../components/CartItemCard';
import OrderSummary from '../components/OrderSummary';
import MobileStickyBar from '../components/MobileStickyBar';
import styles from './index.module.css';

const CheckoutPage = (): JSX.Element => {
  const [cartItems, setCartItems] = useState<CartItem[]>(getCart());

  useEffect(() => {
    const handleUpdate = () => setCartItems(getCart());
    window.addEventListener('cart-updated', handleUpdate);
    return () => window.removeEventListener('cart-updated', handleUpdate);
  }, []);

  const cartWithDetails = useMemo(() => {
    return cartItems
      .map((item) => {
        const book = books.find((b) => b.id === item.bookId);
        if (!book) return null;
        return { ...item, book };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
  }, [cartItems]);

  const subtotal = useMemo(
    () =>
      cartWithDetails.reduce(
        (sum, item) => sum + item.book.price * item.quantity,
        0
      ),
    [cartWithDetails]
  );

  const totalItemsCount = useMemo(
    () => cartWithDetails.reduce((sum, item) => sum + item.quantity, 0),
    [cartWithDetails]
  );

  const handleIncrement = (bookId: number, currentQty: number) => {
    updateQuantity(bookId, currentQty + 1);
  };

  const handleDecrement = (bookId: number, currentQty: number) => {
    if (currentQty <= 1) {
      const book = cartWithDetails.find((i) => i.bookId === bookId)?.book;
      removeFromCart(bookId);
      toast.info(`"${book?.title}" has been removed from your bag.`);
    } else {
      updateQuantity(bookId, currentQty - 1);
    }
  };

  const handleRemove = (bookId: number) => {
    const book = cartWithDetails.find((i) => i.bookId === bookId)?.book;
    removeFromCart(bookId);
    toast.info(`"${book?.title}" has been removed from your bag.`);
  };

  const handleCheckout = () => {
    toast.error('Please sign in to proceed with checkout!');
  };

  return (
    <div className={styles.page}>
      <div className="container">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Bag' }]} />

        <PageHeader title="Your bag" />

        {cartWithDetails.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>Your bag is empty.</p>
            <Link to="/books/0" className={styles.btnContinue}>
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className={styles.layout}>
            {/* Left Column: Cart Items */}
            <div className={styles.itemsList}>
              {cartWithDetails.map((item) => (
                <CartItemCard
                  key={item.bookId}
                  item={item}
                  onRemove={handleRemove}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                />
              ))}
            </div>

            {/* Right Column: Order Summary */}
            <OrderSummary
              subtotal={subtotal}
              totalItemsCount={totalItemsCount}
              onCheckout={handleCheckout}
            />
          </div>
        )}
      </div>

      {/* Mobile Sticky Bar */}
      {cartWithDetails.length > 0 && (
        <MobileStickyBar
          subtotal={subtotal}
          totalItemsCount={totalItemsCount}
          onCheckout={handleCheckout}
        />
      )}
    </div>
  );
};

export default CheckoutPage;
