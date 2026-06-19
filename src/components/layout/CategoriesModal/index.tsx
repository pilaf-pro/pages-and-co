import { type JSX, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import BookIcon from '@mui/icons-material/Book';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import BrushIcon from '@mui/icons-material/Brush';
import categories from '@/data/categories.json';
import styles from './index.module.css';

interface CategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categoryIcons: Record<number, JSX.Element> = {
  0: <MenuBookIcon />, // All
  1: <AutoStoriesIcon />, // Fiction
  2: <BookIcon />, // Mystery
  6: <ChildCareIcon />, // Children
  5: <BrushIcon />, // Poetry
};

export default function CategoriesModal({
  isOpen,
  onClose,
}: CategoriesModalProps): JSX.Element | null {
  const navigate = useNavigate();

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCategoryClick = (categoryId: number) => {
    navigate(`/books/${categoryId}`);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Book Genres</h2>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close categories"
          >
            <CloseIcon />
          </button>
        </div>
        <p className={styles.subtitle}>
          Explore titles across our various collections
        </p>
        <div className={styles.list}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={styles.item}
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className={styles.iconWrapper}>
                {categoryIcons[category.id] || <MenuBookIcon />}
              </div>
              <span className={styles.name}>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
