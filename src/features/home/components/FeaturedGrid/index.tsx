import { type JSX } from 'react';
import BookCard from '@/components/ui/BookCard';
import SectionHeader from '@/components/ui/SectionHeader';
import styles from './index.module.css';

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  rating: number;
  bgColor: string;
  badge?: string;
}

interface FeaturedGridProps {
  kicker: string;
  title: string;
  books: Book[];
}

const FeaturedGrid = ({
  kicker,
  title,
  books,
}: FeaturedGridProps): JSX.Element => {
  return (
    <section className="container">
      <div className={styles.section}>
        <SectionHeader
          kicker={kicker}
          title={title}
          linkText="View all"
          linkHref="#"
        />

        <div className={styles.section__grid}>
          {books.map((book) => (
            <div key={book.id} className={styles.section__item}>
              <BookCard {...book} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedGrid;
