import { type JSX } from 'react';
import BookCard from '@/components/ui/BookCard';
import FadeInSection from '@/components/ui/FadeInSection';
import type { Book } from '@/types/book';
import styles from './index.module.css';

interface RecommendationsProps {
  books: Book[];
}

const Recommendations = ({
  books,
}: RecommendationsProps): JSX.Element | null => {
  if (books.length === 0) return null;

  return (
    <FadeInSection>
      <div className={styles.recommendations}>
        <h3 className={styles.recTitle}>You may also like</h3>
        <div className={styles.recGrid}>
          {books.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
      </div>
    </FadeInSection>
  );
};

export default Recommendations;
