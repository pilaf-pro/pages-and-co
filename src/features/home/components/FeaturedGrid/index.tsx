import { type JSX } from "react";
import BookCard from "@/components/ui/BookCard";
import styles from "./index.module.css";

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
        <div className={styles.section__header}>
          <div>
            <p className={styles.section__kicker}>{kicker}</p>
            <h2 className={styles.section__title}>{title}</h2>
          </div>
          <a href="#" className={styles.section__link}>
            View all &rarr;
          </a>
        </div>

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
