import { type JSX, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookCard from '@/components/ui/BookCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHeader from '@/components/ui/PageHeader';
import FilterBar from '../components/FilterBar';
import FadeInSection from '@/components/ui/FadeInSection';
import books from '@/data/books.json';
import categories from '@/data/categories.json';
import styles from './index.module.css';

const ListPage = (): JSX.Element => {
  const { category } = useParams<{ category?: string }>();
  const navigate = useNavigate();

  const activeCategoryId = useMemo(() => {
    if (!category || category === 'All') return 0;
    const parsed = parseInt(category, 10);
    return isNaN(parsed) ? 0 : parsed;
  }, [category]);

  const [sortBy, setSortBy] = useState('featured');

  const displayedBooks = useMemo(() => {
    // Filter
    let filtered = books;
    if (activeCategoryId !== 0) {
      filtered = books.filter((b) => b.categoryIds.includes(activeCategoryId));
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
  }, [activeCategoryId, sortBy]);

  const handleCategoryChange = (newCategory: number) => {
    navigate(`/books/${newCategory}`);
  };

  const activeCategoryObj = useMemo(() => {
    return categories.find((c) => c.id === activeCategoryId);
  }, [activeCategoryId]);

  const pageTitle =
    activeCategoryId === 0
      ? 'All books'
      : `${activeCategoryObj?.name || ''} books`;

  return (
    <div className={styles.page}>
      <div className="container">
        <Breadcrumb
          items={[{ label: 'Home', href: '/' }, { label: 'Books' }]}
        />

        <PageHeader
          title={pageTitle}
          subtitle={`${displayedBooks.length} titles in the collection`}
        />

        {/* FilterBar */}
        <FilterBar
          categories={categories}
          activeCategory={activeCategoryId}
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
