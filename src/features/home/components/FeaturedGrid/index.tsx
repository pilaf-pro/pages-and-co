import { type JSX, useState, useEffect } from 'react';
import BookCard from '@/components/ui/BookCard';
import SectionHeader from '@/components/ui/SectionHeader';
import Pagination from '@/components/ui/Pagination';
import type { Book } from '@/types/book';
import styles from './index.module.css';

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
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const limit = isMobile ? 4 : 5;
  const hasMore = books.length > limit;

  // Pagination logic
  const totalPages = Math.ceil(books.length / pageSize);
  const displayedBooks = isExpanded
    ? books.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : books.slice(0, limit);

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isExpanded) {
      setIsExpanded(false);
      setCurrentPage(1); // Reset to page 1 when collapsing
    } else {
      setIsExpanded(true);
    }
  };

  return (
    <section className="container">
      <div className={styles.section}>
        <SectionHeader
          kicker={kicker}
          title={title}
          linkText={
            hasMore ? (isExpanded ? 'Show less' : 'View all') : undefined
          }
          hideLinkOnMobile={true}
          onLinkClick={hasMore ? handleToggleExpand : undefined}
        />

        <div className={styles.section__grid}>
          {displayedBooks.map((book) => (
            <div key={book.id} className={styles.section__item}>
              <BookCard {...book} />
            </div>
          ))}
        </div>

        {isExpanded && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={(val) => {
              setPageSize(val);
              setCurrentPage(1);
            }}
            totalItems={books.length}
          />
        )}

        {hasMore && (
          <div className={styles.mobileLinkWrap}>
            <a
              href="#"
              className={styles.mobileLink}
              onClick={handleToggleExpand}
            >
              {isExpanded ? 'Show less' : 'View all'} &rarr;
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedGrid;
