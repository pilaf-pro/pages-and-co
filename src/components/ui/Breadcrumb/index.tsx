import { type JSX } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps): JSX.Element => {
  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={index}>
            {isLast || !item.href ? (
              <span className={isLast ? styles.breadcrumb__active : undefined}>
                {item.label}
              </span>
            ) : (
              <Link to={item.href} className={styles.breadcrumb__link}>
                {item.label}
              </Link>
            )}
            {!isLast && <span className={styles.breadcrumb__separator}>/</span>}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
