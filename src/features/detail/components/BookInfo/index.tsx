import { type JSX } from 'react';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import categories from '@/data/categories.json';
import styles from './index.module.css';

interface BookInfoProps {
  title: string;
  author: string;
  rating: number;
  pages: number;
  publishedYear: number;
  price: number;
  originalPrice?: number;
  description: string;
  publisher: string;
  isbn: string;
  categoryIds: number[];
  isInCart: boolean;
  onAddToBag: () => void;
}

const BookInfo = ({
  title,
  author,
  rating,
  pages,
  publishedYear,
  price,
  originalPrice,
  description,
  publisher,
  isbn,
  categoryIds,
  isInCart,
  onAddToBag,
}: BookInfoProps): JSX.Element => {
  return (
    <div className={styles.info}>
      {/* Categories */}
      <div className={styles.categoriesContainer}>
        {categoryIds.map((catId) => {
          const categoryObj = categories.find((c) => c.id === catId);
          return (
            <span key={catId} className={styles.categoryTag}>
              {categoryObj ? categoryObj.name : ''}
            </span>
          );
        })}
      </div>

      <h1 className={styles.title}>{title}</h1>
      <p className={styles.author}>by {author}</p>

      <div className={styles.metaRow}>
        <span className={styles.rating}>
          <span className={styles.ratingIcon}>★</span> {rating.toFixed(1)}
        </span>
        <span className={styles.metaDivider}>•</span>
        <span>{pages} pages</span>
        <span className={styles.metaDivider}>•</span>
        <span>{publishedYear}</span>
      </div>

      <div className={styles.priceSection}>
        <span className={styles.price}>${price.toFixed(2)}</span>
        {originalPrice && (
          <span className={styles.priceOriginal}>
            ${originalPrice.toFixed(2)}
          </span>
        )}
      </div>

      <p className={styles.description}>{description}</p>

      {/* Actions */}
      <div className={styles.actions}>
        {isInCart ? (
          <>
            <button className={styles.btnPrimaryAdded} disabled>
              Added to bag
            </button>
            <Link to="/checkout" className={styles.btnGoToBag}>
              Go to bag
            </Link>
          </>
        ) : (
          <button className={styles.btnPrimary} onClick={onAddToBag}>
            Add to bag — ${price.toFixed(2)}
          </button>
        )}
        <button className={styles.btnSecondary}>
          <FavoriteBorderIcon fontSize="small" /> Wishlist
        </button>
      </div>

      {/* Technical Specs */}
      <div className={styles.specsGrid}>
        <div>
          <div className={styles.specLabel}>Format</div>
          <div className={styles.specValue}>Paperback</div>
        </div>
        <div>
          <div className={styles.specLabel}>Pages</div>
          <div className={styles.specValue}>{pages}</div>
        </div>
        <div>
          <div className={styles.specLabel}>Published</div>
          <div className={styles.specValue}>{publishedYear}</div>
        </div>
        <div>
          <div className={styles.specLabel}>Publisher</div>
          <div className={styles.specValue}>{publisher}</div>
        </div>
        <div>
          <div className={styles.specLabel}>Language</div>
          <div className={styles.specValue}>English</div>
        </div>
        <div>
          <div className={styles.specLabel}>ISBN</div>
          <div className={styles.specValue}>{isbn}</div>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
