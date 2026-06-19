import { type JSX, useState, useEffect } from 'react';
import TuneIcon from '@mui/icons-material/Tune';
import CloseIcon from '@mui/icons-material/Close';
import styles from './index.module.css';
interface Category {
  id: number;
  name: string;
}

interface FilterBarProps {
  categories: Category[];
  activeCategory: number;
  onCategoryChange: (id: number) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

const FilterBar = ({
  categories,
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}: FilterBarProps): JSX.Element => {
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [tempCategory, setTempCategory] = useState(activeCategory);
  const [tempSortBy, setTempSortBy] = useState(sortBy);
  // Prevent background scroll when mobile modal is open
  useEffect(() => {
    if (isMobileModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileModalOpen]);

  const handleApply = () => {
    onCategoryChange(tempCategory);
    onSortChange(tempSortBy);
    setIsMobileModalOpen(false);
  };

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
  ];

  return (
    <>
      <div className={styles.filterBar}>
        {/* Mobile Button */}
        <button
          className={styles.filterBar__mobileBtn}
          onClick={() => {
            setTempCategory(activeCategory);
            setTempSortBy(sortBy);
            setIsMobileModalOpen(true);
          }}
        >
          <TuneIcon fontSize="small" /> Filter & Sort
        </button>

        {/* Desktop UI */}
        <div className={styles.filterBar__desktop}>
          <div className={styles.filterBar__categories}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`${styles.filterBar__categoryBtn} ${
                  activeCategory === category.id
                    ? styles['filterBar__categoryBtn--active']
                    : ''
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          <div className={styles.filterBar__sort}>
            <span className={styles.filterBar__sortLabel}>Sort by</span>
            <select
              className={styles.filterBar__sortSelect}
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Modal (Bottom Sheet) */}
      {isMobileModalOpen && (
        <div
          className={styles.mobileOverlay}
          onClick={() => setIsMobileModalOpen(false)}
        >
          <div
            className={styles.mobileSheet}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.mobileSheet__header}>
              <h3 className={styles.mobileSheet__title}>Filter & Sort</h3>
              <button
                className={styles.mobileSheet__close}
                onClick={() => setIsMobileModalOpen(false)}
              >
                <CloseIcon />
              </button>
            </div>

            <div className={styles.mobileSheet__content}>
              <div className={styles.mobileSheet__section}>
                <h4 className={styles.mobileSheet__sectionTitle}>Genre</h4>
                <div className={styles.mobileSheet__chips}>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setTempCategory(c.id)}
                      className={`${styles.mobileSheet__chip} ${
                        tempCategory === c.id
                          ? styles['mobileSheet__chip--active']
                          : ''
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.mobileSheet__section}>
                <h4 className={styles.mobileSheet__sectionTitle}>Sort By</h4>
                <div className={styles.mobileSheet__radioGroup}>
                  {sortOptions.map((opt) => (
                    <label
                      key={opt.value}
                      className={styles.mobileSheet__radio}
                    >
                      <input
                        type="radio"
                        name="mobileSort"
                        value={opt.value}
                        checked={tempSortBy === opt.value}
                        onChange={() => setTempSortBy(opt.value)}
                        className={styles.mobileSheet__radioInput}
                      />
                      <span className={styles.mobileSheet__radioLabel}>
                        {opt.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                className={styles.mobileSheet__applyBtn}
                onClick={handleApply}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterBar;
