import { type JSX } from 'react';
import styles from './index.module.css';

interface Category {
  id: string;
  name: string;
}

interface FilterBarProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
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
  return (
    <div className={styles.filterBar}>
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
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
