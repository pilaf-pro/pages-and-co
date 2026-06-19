import { type JSX } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import styles from './index.module.css';

const categories = [
  { name: 'Fiction', count: 3, color: 'var(--card-brown)' },
  { name: 'Mystery', count: 2, color: 'var(--card-blue)' },
  { name: 'Sci-Fi', count: 2, color: 'var(--card-teal)' },
  { name: 'Poetry', count: 2, color: 'var(--card-red)' },
  { name: 'Children', count: 2, color: 'var(--card-yellow)' },
  { name: 'Non-fiction', count: 2, color: 'var(--card-purple)' },
];

const Categories = (): JSX.Element => {
  return (
    <section className="container">
      <div className={styles.categories}>
        <SectionHeader kicker="FIND YOUR SHELF" title="Browse by genre" />

        <div className={styles.categories__grid}>
          {categories.map((cat) => (
            <a
              href="#"
              key={cat.name}
              className={styles.category}
              style={{
                background: `linear-gradient(to bottom right, rgba(0, 0, 0, 0.6) 0%, rgba(255, 255, 255, 0) 100%), ${cat.color}`,
              }}
            >
              <h3 className={styles.category__name}>{cat.name}</h3>
              <p className={styles.category__count}>{cat.count} titles</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
