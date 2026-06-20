import { type JSX, useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import booksData from '@/data/books.json';
import type { Book } from '@/types/book';
import { addToCart, getCart } from '@/utils/cartUtils';
import Breadcrumb from '@/components/ui/Breadcrumb';
import BookCover from '../components/BookCover';
import BookInfo from '../components/BookInfo';
import Recommendations from '../components/Recommendations';
import styles from './index.module.css';

const books = booksData as Book[];

const DetailPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const [isInCart, setIsInCart] = useState(false);

  const currentBook = useMemo(() => {
    if (!id) return undefined;
    const parsedId = parseInt(id, 10);
    return books.find((b) => b.id === parsedId);
  }, [id]);

  useEffect(() => {
    if (!currentBook) return;
    const checkCartStatus = () => {
      const cart = getCart();
      setIsInCart(cart.some((item) => item.bookId === currentBook.id));
    };
    checkCartStatus();
    window.addEventListener('cart-updated', checkCartStatus);
    return () => window.removeEventListener('cart-updated', checkCartStatus);
  }, [currentBook]);

  const handleAddToBag = () => {
    if (!currentBook) return;
    addToCart(currentBook.id);
    toast.success(`"${currentBook.title}" added to bag!`);
  };

  const recommendations = useMemo(() => {
    if (!currentBook) return [];
    return books
      .filter(
        (b) =>
          b.id !== currentBook.id &&
          b.categoryIds.some((cat) => currentBook.categoryIds.includes(cat))
      )
      .slice(0, 4);
  }, [currentBook]);

  if (!currentBook) {
    return (
      <div className={styles.page}>
        <div
          className="container"
          style={{ textAlign: 'center', padding: '100px 0' }}
        >
          <h2>Book not found</h2>
          <p>
            The book you are looking for does not exist or has been removed.
          </p>
          <Link
            to="/books/0"
            className={styles.btnFallback}
            style={{ display: 'inline-block', marginTop: '20px' }}
          >
            Go to Shop
          </Link>
        </div>
      </div>
    );
  }

  const publishedYear = new Date(currentBook.dateAdded).getFullYear();
  const pages = currentBook.pages || 320;
  const publisher = currentBook.publisher || 'Harbor & Vale';
  const isbn = `978-1-23456-001-${currentBook.id}`;
  const description =
    currentBook.description ||
    'A fascinating read exploring human emotion, relationships, and the intricate spaces we build around ourselves.';

  return (
    <div className={styles.page}>
      <div className="container">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Books', href: '/books/0' },
            { label: currentBook.title },
          ]}
        />

        {/* Main Grid */}
        <div className={styles.grid}>
          <BookCover
            title={currentBook.title}
            author={currentBook.author}
            bgColor={currentBook.bgColor}
            badge={currentBook.badge}
          />
          <BookInfo
            title={currentBook.title}
            author={currentBook.author}
            rating={currentBook.rating}
            pages={pages}
            publishedYear={publishedYear}
            price={currentBook.price}
            originalPrice={currentBook.originalPrice}
            description={description}
            publisher={publisher}
            isbn={isbn}
            categoryIds={currentBook.categoryIds}
            isInCart={isInCart}
            onAddToBag={handleAddToBag}
          />
        </div>

        <Recommendations books={recommendations} />
      </div>
    </div>
  );
};

export default DetailPage;
