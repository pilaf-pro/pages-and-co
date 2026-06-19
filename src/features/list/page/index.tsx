import { type JSX, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookCard from '@/components/ui/BookCard';
import FilterBar from '../components/FilterBar';
import FadeInSection from '@/components/ui/FadeInSection';
import books from '@/data/books.json';
import categories from '@/data/categories.json';
import styles from './index.module.css';

const ListPage = (): JSX.Element => {
  const { category } = useParams<{ category?: string }>();
  const navigate = useNavigate();

  const activeCategory = category || 'All';
  const [sortBy, setSortBy] = useState('featured');

  const displayedBooks = useMemo(() => {
    // Filter
    let filtered = books;
    if (activeCategory !== 'All') {
      filtered = books.filter((b) => b.categoryIds.includes(activeCategory));
    }

    // Sort (create a copy to avoid mutating original json array)
    return [...filtered].sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'newest') {
        return (
          new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        );
      }
      if (sortBy === 'featured') {
        // Priority to bestsellers, then by rating
        if (a.isBestseller && !b.isBestseller) return -1;
        if (!a.isBestseller && b.isBestseller) return 1;
        return b.rating - a.rating;
      }
      return 0;
    });
  }, [activeCategory, sortBy]);

  const handleCategoryChange = (newCategory: string) => {
    navigate(`/books/${newCategory}`);
  };

  const pageTitle =
    activeCategory === 'All' ? 'All books' : `${activeCategory} books`;

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Breadcrumb */}
        <div className={styles.page__breadcrumb}>
          <span>Home</span>{' '}
          <span className={styles.page__breadcrumbSeparator}>/</span>{' '}
          <span className={styles.page__breadcrumbActive}>Books</span>
        </div>

        {/* Header */}
        <div className={styles.page__header}>
          <h1 className={styles.page__title}>{pageTitle}</h1>
          <p className={styles.page__subtitle}>
            {displayedBooks.length} titles in the collection
          </p>
        </div>

        {/* FilterBar */}
        <FilterBar
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Grid */}
        <FadeInSection>
          <div className={styles.page__grid}>
            {displayedBooks.map((book) => (
              <div key={book.id} className={styles.page__gridItem}>
                <BookCard {...book} />
              </div>
            ))}
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default ListPage;
