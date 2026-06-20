import { type JSX } from 'react';
import styles from './index.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  totalItems?: number;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
  totalItems,
}: PaginationProps): JSX.Element | null => {
  const isVisible =
    totalPages > 1 || (totalItems !== undefined && totalItems > 10);
  if (!isVisible) return null;

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          '...',
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages
        );
      }
    }
    return pages;
  };

  return (
    <div className={styles.paginationWrapper}>
      {pageSize && onPageSizeChange && (
        <div className={styles.pagination__pageSize}>
          <label htmlFor="pageSize">Show:</label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className={styles.pagination__select}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      )}

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pagination__btn}
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            &larr; Prev
          </button>

          <div className={styles.pagination__numbers}>
            {getPageNumbers().map((page, index) =>
              page === '...' ? (
                <span
                  key={`ellipsis-${index}`}
                  className={styles.pagination__ellipsis}
                >
                  ...
                </span>
              ) : (
                <button
                  key={`page-${page}`}
                  className={`${styles.pagination__number} ${
                    page === currentPage
                      ? styles['pagination__number--active']
                      : ''
                  }`}
                  onClick={() => onPageChange(page as number)}
                >
                  {page}
                </button>
              )
            )}
          </div>

          <div className={styles['pagination__mobile-info']}>
            Page {currentPage} of {totalPages}
          </div>

          <button
            className={styles.pagination__btn}
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next &rarr;
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
