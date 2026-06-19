import { type JSX } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/ui/SectionHeader';
import styles from './index.module.css';

const categories = [
  { id: 1, name: 'Fiction', count: 18, color: 'var(--card-brown)' },
  { id: 2, name: 'Mystery', count: 11, color: 'var(--card-blue)' },
  { id: 3, name: 'Sci-Fi', count: 7, color: 'var(--card-teal)' },
  { id: 5, name: 'Poetry', count: 4, color: 'var(--card-red)' },
  { id: 6, name: 'Children', count: 5, color: 'var(--card-yellow)' },
  { id: 4, name: 'Non-fiction', count: 5, color: 'var(--card-purple)' },
];

const Categories = (): JSX.Element => {
  return (
    <section className="container">
      <div className={styles.categories}>
        <SectionHeader kicker="FIND YOUR SHELF" title="Browse by genre" />

        <div className={styles.categories__grid}>
          {categories.map((cat) => (
            <Link
              to={`/books/${cat.id}`}
              key={cat.id}
              className={styles.category}
              style={{
                background: `linear-gradient(to bottom right, rgba(0, 0, 0, 0.6) 0%, rgba(255, 255, 255, 0) 100%), ${cat.color}`,
              }}
            >
              <h3 className={styles.category__name}>{cat.name}</h3>
              <p className={styles.category__count}>{cat.count} titles</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
